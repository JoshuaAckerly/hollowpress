#!/bin/bash

# HollowPress Enhanced Search Relevance Monitoring & Tuning System
# Comprehensive monitoring, analytics, and automated tuning for search functionality

BASE_URL="http://hollowpress.graveyardjokes.local"
LOG_DIR="./logs/search-monitoring"
ANALYTICS_DIR="./analytics/search"
TUNING_DIR="./tuning/search"
CONFIG_FILE="./config/search-tuning.conf"

# Create directories
mkdir -p "$LOG_DIR" "$ANALYTICS_DIR" "$TUNING_DIR"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Configuration defaults
MIN_SUCCESS_RATE=80
MAX_RESPONSE_TIME=300
TUNING_THRESHOLD=70
ANALYTICS_RETENTION_DAYS=30

# Load configuration if exists
if [ -f "$CONFIG_FILE" ]; then
    # Source only simple variables, not arrays
    eval "$(grep -E '^(MIN_SUCCESS_RATE|MAX_RESPONSE_TIME|TUNING_THRESHOLD|ANALYTICS_RETENTION_DAYS|ALERT_WEBHOOK_URL|ALERT_EMAIL)=' "$CONFIG_FILE" 2>/dev/null || true)"
fi

log() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> "$LOG_DIR/search-monitor.log"
    echo -e "$message"
}

alert() {
    local message=$1
    local severity=${2:-"WARNING"}

    log "ALERT" "$severity: $message"

    # Send alert if configured
    if [ -n "$ALERT_WEBHOOK_URL" ]; then
        curl -s -X POST "$ALERT_WEBHOOK_URL" \
            -H "Content-Type: application/json" \
            -d "{\"text\":\"HollowPress Search $severity: $message\"}" || true
    fi
}

# Enhanced test queries with scoring expectations
declare -A TEST_QUERIES=(
    ["Laravel Best Practices"]="Laravel Best Practices:400"
    ["React Component"]="React Component Patterns:250"
    ["Laravel"]="Laravel Best Practices:400"
    ["framework"]="Laravel Best Practices:180"
    ["John Developer"]="Laravel Best Practices:140"
    ["database optimization"]="Database Optimization Techniques:180"
    ["API design"]="RESTful API Design Principles:250"
    ["TypeScript"]="TypeScript Integration Guide:400"
    ["testing"]="Testing Strategies in Laravel:180"
    ["performance"]="Performance Optimization:400"
)

PERF_QUERIES=("Laravel" "React" "TypeScript" "database" "API" "framework" "hooks" "patterns" "testing" "performance")
PERF_QUERIES=("Laravel" "React" "TypeScript" "database" "API" "framework" "hooks" "patterns" "testing" "performance")

# Edge case queries
EDGE_CASES=("nonexistent12345" "" "a" "the" "and" "or" "but" "in" "on" "at")

# Global metrics
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
TOTAL_RESPONSE_TIME=0
SLOW_RESPONSES=0
SEARCH_CLICKS=0
NO_RESULTS=0

# Analytics storage
ANALYTICS_FILE="$ANALYTICS_DIR/$(date +%Y-%m-%d).json"
TUNING_FILE="$TUNING_DIR/tuning-recommendations.json"

init_analytics() {
    if [ ! -f "$ANALYTICS_FILE" ]; then
        echo '{"date":"'$(date +%Y-%m-%d)'","tests":[],"metrics":{},"recommendations":[]}' > "$ANALYTICS_FILE"
    fi
}

save_test_result() {
    local query=$1
    local expected_score=$2
    local actual_score=$3
    local response_time=$4
    local result=$5

    local test_data='{"query":"'"$query"'","expected_score":'"$expected_score"',"actual_score":'"$actual_score"',"response_time":'"$response_time"',"result":"'"$result"'","timestamp":"'$(date +%s)'"}'

    # Append to analytics file
    local temp_file=$(mktemp)
    jq ".tests += [$test_data]" "$ANALYTICS_FILE" > "$temp_file" && mv "$temp_file" "$ANALYTICS_FILE"
}

update_metrics() {
    local success_rate=$1
    local avg_response_time=$2
    local slow_responses=$3

    local metrics='{"success_rate":'"$success_rate"',"avg_response_time":'"$avg_response_time"',"slow_responses":'"$slow_responses"',"total_searches":'"$TOTAL_TESTS"'}'

    local temp_file=$(mktemp)
    jq ".metrics = $metrics" "$ANALYTICS_FILE" > "$temp_file" && mv "$temp_file" "$ANALYTICS_FILE"
}

test_search_relevance() {
    local query=$1
    local expected=$2
    local expected_title=$(echo "$expected" | cut -d: -f1)
    local expected_score=$(echo "$expected" | cut -d: -f2)

    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    log "INFO" "${BLUE}Testing relevance: '$query'${NC}"
    log "INFO" "Expected: '$expected_title' (score: $expected_score)"

    local start_time=$(date +%s%N)
    local response=$(curl -s -w "\n%{http_code}" \
        "${BASE_URL}/posts?q=${query// /%20}" \
        -H "Accept: application/json" \
        -H "X-Requested-With: XMLHttpRequest")

    local http_code=$(echo "$response" | tail -n1)
    local body=$(echo "$response" | head -n -1)
    local end_time=$(date +%s%N)
    local response_time=$(( (end_time - start_time) / 1000000 ))

    TOTAL_RESPONSE_TIME=$((TOTAL_RESPONSE_TIME + response_time))

    if [ "$response_time" -gt "$MAX_RESPONSE_TIME" ]; then
        SLOW_RESPONSES=$((SLOW_RESPONSES + 1))
        log "WARN" "${YELLOW}⚠ Slow response: ${response_time}ms${NC}"
    fi

    if [ "$http_code" -ne 200 ]; then
        log "ERROR" "${RED}✗ HTTP $http_code - Request failed${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        save_test_result "$query" "$expected_score" "0" "$response_time" "failed"
        return 1
    fi

    # Extract results
    local results_count=$(echo "$body" | jq -r '.props.posts.data | length' 2>/dev/null || echo "0")
    local first_title=$(echo "$body" | jq -r '.props.posts.data[0].title' 2>/dev/null || echo "")
    local first_score=$(echo "$body" | jq -r '.props.posts.data[0].search_score' 2>/dev/null || echo "0")

    log "INFO" "Results: $results_count, Top: '$first_title' (score: $first_score), Time: ${response_time}ms"

    if [ "$results_count" -eq 0 ]; then
        NO_RESULTS=$((NO_RESULTS + 1))
        log "WARN" "${YELLOW}⚠ No results found${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        save_test_result "$query" "$expected_score" "0" "$response_time" "no_results"
        return 1
    fi

    # Check relevance
    if [ "$first_title" = "$expected_title" ]; then
        log "INFO" "${GREEN}✓ PASS - Correct top result${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        save_test_result "$query" "$expected_score" "$first_score" "$response_time" "passed"
        return 0
    else
        log "ERROR" "${RED}✗ FAIL - Expected '$expected_title', got '$first_title'${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        save_test_result "$query" "$expected_score" "$first_score" "$response_time" "wrong_result"
        return 1
    fi
}

run_performance_tests() {
    log "INFO" "${BLUE}Running performance benchmark...${NC}"

    local total_time=0
    local count=0
    local slow_count=0

    for query in "${PERF_QUERIES[@]}"; do
        local start_time=$(date +%s%N)
        curl -s "${BASE_URL}/posts?q=${query}" > /dev/null
        local end_time=$(date +%s%N)
        local duration=$(( (end_time - start_time) / 1000000 ))

        total_time=$((total_time + duration))
        count=$((count + 1))

        if [ "$duration" -gt "$MAX_RESPONSE_TIME" ]; then
            slow_count=$((slow_count + 1))
        fi

        log "DEBUG" "Query '$query': ${duration}ms"
    done

    local avg_time=$((total_time / count))
    log "INFO" "Performance benchmark complete - Average: ${avg_time}ms, Slow queries: $slow_count"

    if [ "$avg_time" -lt 200 ]; then
        log "INFO" "${GREEN}✓ Performance acceptable${NC}"
    else
        log "WARN" "${RED}⚠ Performance needs improvement${NC}"
        alert "Search performance degraded - Average ${avg_time}ms" "WARNING"
    fi

    return $avg_time
}

run_edge_case_tests() {
    log "INFO" "${BLUE}Running edge case tests...${NC}"

    local edge_passed=0
    local edge_total=0

    for query in "${EDGE_CASES[@]}"; do
        edge_total=$((edge_total + 1))

        local response=$(curl -s "${BASE_URL}/posts?q=${query}" \
            -H "Accept: application/json" \
            -H "X-Requested-With: XMLHttpRequest")

        local results_count=$(echo "$response" | jq -r '.props.posts.data | length' 2>/dev/null || echo "0")

        case "$query" in
            "nonexistent12345")
                if [ "$results_count" -eq 0 ]; then
                    edge_passed=$((edge_passed + 1))
                    log "INFO" "${GREEN}✓ Non-existent query correctly returns no results${NC}"
                else
                    log "WARN" "${YELLOW}⚠ Non-existent query returns $results_count results${NC}"
                fi
                ;;
            "")
                if [ "$results_count" -gt 0 ]; then
                    edge_passed=$((edge_passed + 1))
                    log "INFO" "${GREEN}✓ Empty query returns results${NC}"
                else
                    log "WARN" "${YELLOW}⚠ Empty query returns no results${NC}"
                fi
                ;;
            "a"|"the"|"and"|"or"|"but"|"in"|"on"|"at")
                # Stop words should return results but with lower relevance
                if [ "$results_count" -gt 0 ]; then
                    edge_passed=$((edge_passed + 1))
                    log "INFO" "${GREEN}✓ Stop word '$query' returns $results_count results${NC}"
                else
                    log "WARN" "${YELLOW}⚠ Stop word '$query' returns no results${NC}"
                fi
                ;;
        esac
    done

    local edge_success_rate=$(( (edge_passed * 100) / edge_total ))
    log "INFO" "Edge case tests: $edge_passed/$edge_total passed (${edge_success_rate}%)"

    return $edge_success_rate
}

analyze_search_patterns() {
    log "INFO" "${BLUE}Analyzing search patterns and generating tuning recommendations...${NC}"

    # Read recent analytics
    local recent_files=$(find "$ANALYTICS_DIR" -name "*.json" -mtime -7 | head -7)

    if [ -z "$recent_files" ]; then
        log "WARN" "No recent analytics data available for analysis"
        return
    fi

    # Aggregate data from recent files
    local total_recent_tests=0
    local total_recent_passed=0
    local total_recent_failed=0
    local common_failures=""
    local slow_queries=""

    for file in $recent_files; do
        if [ -f "$file" ]; then
            local tests_count=$(jq '.tests | length' "$file" 2>/dev/null || echo 0)
            local passed_count=$(jq '[.tests[] | select(.result == "passed")] | length' "$file" 2>/dev/null || echo 0)
            local failed_count=$((tests_count - passed_count))

            total_recent_tests=$((total_recent_tests + tests_count))
            total_recent_passed=$((total_recent_passed + passed_count))
            total_recent_failed=$((total_recent_failed + failed_count))

            # Collect common failure patterns
            local failures=$(jq -r '.tests[] | select(.result != "passed") | .query' "$file" 2>/dev/null | tr '\n' ',' | sed 's/,$//')
            if [ -n "$failures" ]; then
                common_failures="${common_failures:+$common_failures,}$failures"
            fi

            # Collect slow queries
            local slow=$(jq -r '.tests[] | select(.response_time > 500) | .query' "$file" 2>/dev/null | tr '\n' ',' | sed 's/,$//')
            if [ -n "$slow" ]; then
                slow_queries="${slow_queries:+$slow_queries,}$slow"
            fi
        fi
    done

    # Generate recommendations
    local recommendations='[]'

    if [ $total_recent_tests -gt 0 ]; then
        local recent_success_rate=$(( (total_recent_passed * 100) / total_recent_tests ))

        if [ $recent_success_rate -lt $TUNING_THRESHOLD ]; then
            recommendations=$(jq -n --arg rate "$recent_success_rate" --arg threshold "$TUNING_THRESHOLD" '[
                {
                    "type": "relevance_tuning",
                    "priority": "high",
                    "message": "Search relevance below threshold (\($rate)% < \($threshold)%)",
                    "action": "Review and adjust search scoring weights in PostController"
                }
            ]')
        fi

        # Check for common failure patterns
        if [ -n "$common_failures" ]; then
            local unique_failures=$(echo "$common_failures" | tr ',' '\n' | sort | uniq -c | sort -nr | head -3 | awk '{print $2}' | tr '\n' ',' | sed 's/,$//')
            if [ -n "$unique_failures" ]; then
                recommendations=$(echo "$recommendations" | jq --arg failures "$unique_failures" '. + [{
                    "type": "content_indexing",
                    "priority": "medium",
                    "message": "Common search failures for: \($failures)",
                    "action": "Review content indexing and add missing keywords"
                }]')
            fi
        fi

        # Performance recommendations
        if [ -n "$slow_queries" ]; then
            recommendations=$(echo "$recommendations" | jq --arg slow "$slow_queries" '. + [{
                "type": "performance_optimization",
                "priority": "medium",
                "message": "Slow queries detected for: \($slow)",
                "action": "Add database indexes or optimize search queries"
            }]')
        fi
    fi

    # Save recommendations
    echo "{\"date\":\"$(date +%Y-%m-%d)\",\"recommendations\":$recommendations}" > "$TUNING_FILE"

    log "INFO" "Analysis complete - Generated $(echo "$recommendations" | jq length) recommendations"
}

cleanup_old_analytics() {
    log "INFO" "Cleaning up old analytics files (retention: ${ANALYTICS_RETENTION_DAYS} days)..."

    find "$ANALYTICS_DIR" -name "*.json" -mtime +$ANALYTICS_RETENTION_DAYS -delete
    find "$LOG_DIR" -name "*.log" -mtime +$ANALYTICS_RETENTION_DAYS -delete

    log "INFO" "Cleanup complete"
}

generate_report() {
    local success_rate=0
    if [ $TOTAL_TESTS -gt 0 ]; then
        success_rate=$(( (PASSED_TESTS * 100) / TOTAL_TESTS ))
    fi

    local avg_response_time=0
    if [ $TOTAL_TESTS -gt 0 ]; then
        avg_response_time=$((TOTAL_RESPONSE_TIME / TOTAL_TESTS))
    fi

    log "INFO" "${BLUE}=== Search Relevance Report ===${NC}"
    log "INFO" "Total Tests: $TOTAL_TESTS"
    log "INFO" "Passed: $PASSED_TESTS"
    log "INFO" "Failed: $FAILED_TESTS"
    log "INFO" "Success Rate: ${success_rate}%"
    log "INFO" "Average Response Time: ${avg_response_time}ms"
    log "INFO" "Slow Responses: $SLOW_RESPONSES"
    log "INFO" "No Results Queries: $NO_RESULTS"

    # Update analytics with final metrics
    update_metrics "$success_rate" "$avg_response_time" "$SLOW_RESPONSES"

    # Determine overall status
    if [ $success_rate -ge $MIN_SUCCESS_RATE ]; then
        log "INFO" "${GREEN}✓ Overall: GOOD - Search relevance is performing well${NC}"
    elif [ $success_rate -ge 60 ]; then
        log "WARN" "${YELLOW}⚠ Overall: NEEDS IMPROVEMENT - Some relevance issues detected${NC}"
        alert "Search relevance needs improvement (${success_rate}% success rate)" "WARNING"
    else
        log "ERROR" "${RED}✗ Overall: POOR - Major relevance problems requiring immediate attention${NC}"
        alert "Critical search relevance issues detected (${success_rate}% success rate)" "CRITICAL"
    fi
}

main() {
    log "INFO" "${PURPLE}Starting Enhanced HollowPress Search Relevance Monitoring${NC}"
    log "INFO" "Base URL: $BASE_URL"
    log "INFO" "Analytics: $ANALYTICS_DIR"
    log "INFO" "Logs: $LOG_DIR"

    # Initialize analytics
    init_analytics

    # Run relevance tests
    log "INFO" "${BLUE}Running relevance tests...${NC}"
    for query in "${!TEST_QUERIES[@]}"; do
        test_search_relevance "$query" "${TEST_QUERIES[$query]}"
    done

    # Run performance tests
    local perf_avg=$(run_performance_tests)

    # Run edge case tests
    local edge_success=$(run_edge_case_tests)

    # Generate report
    generate_report

    # Analyze patterns and generate tuning recommendations
    analyze_search_patterns

    # Cleanup old data
    cleanup_old_analytics

    log "INFO" "${PURPLE}Search relevance monitoring complete${NC}"
    log "INFO" "Results saved to: $ANALYTICS_FILE"
    log "INFO" "Tuning recommendations: $TUNING_FILE"
    log "INFO" "Logs: $LOG_DIR/search-monitor.log"
}

# Check dependencies
if ! command -v jq &> /dev/null; then
    echo "${RED}Error: jq is required for JSON processing. Install with: sudo apt-get install jq${NC}"
    exit 1
fi

if ! command -v curl &> /dev/null; then
    echo "${RED}Error: curl is required for HTTP requests. Install with: sudo apt-get install curl${NC}"
    exit 1
fi

main "$@"</content>
<parameter name="filePath">/home/joshua/Documents/hollowpress/search-monitor-enhanced.sh