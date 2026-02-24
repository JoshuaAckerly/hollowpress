#!/bin/bash

# HollowPress Search Relevance Monitoring Script
# Tests search functionality and validates relevance scoring

BASE_URL="http://hollowpress.graveyardjokes.local"
LOG_FILE="/tmp/hollowpress-search-monitor.log"
RESULTS_FILE="/tmp/hollowpress-search-results.json"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
    echo -e "$1"
}

# Test queries with expected results
declare -A TEST_QUERIES=(
    ["Laravel Best Practices"]="Laravel Best Practices"
    ["React Component Patterns"]="React Component Patterns"
    ["Laravel"]="Laravel Best Practices"
    ["framework"]="Laravel Best Practices"
    ["John Developer"]="Laravel Best Practices"
)

PASSED=0
FAILED=0
TOTAL_TESTS=0

test_search() {
    local query="$1"
    local expected_title="$2"
    local test_name="$3"

    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    log "${BLUE}Testing: $test_name${NC}"
    log "Query: '$query'"
    log "Expected: '$expected_title'"

    # Make search request
    local start_time=$(date +%s%N)
    local response=$(curl -s -w "\n%{http_code}" \
        "${BASE_URL}/posts?q=${query// /%20}" \
        -H "Accept: application/json" \
        -H "X-Requested-With: XMLHttpRequest")

    local http_code=$(echo "$response" | tail -n1)
    local body=$(echo "$response" | head -n -1)
    local end_time=$(date +%s%N)
    local duration=$(( (end_time - start_time) / 1000000 )) # Convert to milliseconds

    if [ "$http_code" -ne 200 ]; then
        log "${RED}✗ HTTP $http_code - Request failed${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

    log "Response time: ${duration}ms"

    # Extract first post title from JSON response
    local first_title=$(echo "$body" | jq -r '.props.posts.data[0].title' 2>/dev/null)

    if [ -z "$first_title" ] || [ "$first_title" = "null" ]; then
        log "${RED}✗ No results found${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

    log "Actual top result: '$first_title'"

    if [ "$first_title" = "$expected_title" ]; then
        log "${GREEN}✓ PASS - Correct result${NC}"
        PASSED=$((PASSED + 1))
    else
        log "${RED}✗ FAIL - Expected '$expected_title', got '$first_title'${NC}"
        FAILED=$((FAILED + 1))
    fi

    # Log performance
    if [ "$duration" -gt 500 ]; then
        log "${YELLOW}⚠ Slow response: ${duration}ms${NC}"
    fi

    echo "" # Blank line
}

run_performance_test() {
    log "${BLUE}Running performance tests...${NC}"

    local queries=("Laravel" "React" "TypeScript" "database" "API" "framework" "hooks" "patterns")
    local total_time=0
    local count=0

    for query in "${queries[@]}"; do
        local start_time=$(date +%s%N)
        curl -s "${BASE_URL}/posts?q=${query}" > /dev/null
        local end_time=$(date +%s%N)
        local duration=$(( (end_time - start_time) / 1000000 ))
        total_time=$((total_time + duration))
        count=$((count + 1))
    done

    local avg_time=$((total_time / count))
    log "Average response time: ${avg_time}ms"

    if [ "$avg_time" -lt 200 ]; then
        log "${GREEN}✓ Performance acceptable${NC}"
    else
        log "${RED}⚠ Performance needs improvement${NC}"
    fi
}

run_edge_case_tests() {
    log "${BLUE}Running edge case tests...${NC}"

    # Empty query
    local empty_response=$(curl -s "${BASE_URL}/posts" \
        -H "Accept: application/json" \
        -H "X-Requested-With: XMLHttpRequest")

    local empty_count=$(echo "$empty_response" | jq -r '.props.posts.data | length' 2>/dev/null)
    if [ "$empty_count" -gt 0 ]; then
        log "${GREEN}✓ Empty query returns results${NC}"
    else
        log "${RED}✗ Empty query returns no results${NC}"
    fi

    # Non-existent query
    local nonexistent_response=$(curl -s "${BASE_URL}/posts?q=nonexistent12345" \
        -H "Accept: application/json" \
        -H "X-Requested-With: XMLHttpRequest")

    local nonexistent_count=$(echo "$nonexistent_response" | jq -r '.props.posts.data | length' 2>/dev/null)
    if [ "$nonexistent_count" -eq 0 ]; then
        log "${GREEN}✓ Non-existent query returns no results${NC}"
    else
        log "${RED}✗ Non-existent query returns results${NC}"
    fi
}

main() {
    log "${YELLOW}Starting HollowPress Search Relevance Monitor${NC}"
    log "Base URL: $BASE_URL"
    log "Log file: $LOG_FILE"
    echo ""

    # Test basic functionality
    test_search "Laravel Best Practices" "Laravel Best Practices" "Exact title match"
    test_search "Laravel" "Laravel Best Practices" "Title prefix match"
    test_search "framework" "Laravel Best Practices" "Content match"
    test_search "John Developer" "Laravel Best Practices" "Author match"

    # Performance tests
    run_performance_test

    # Edge cases
    run_edge_case_tests

    # Summary
    echo ""
    log "${BLUE}=== Test Summary ===${NC}"
    log "Total tests: $TOTAL_TESTS"
    log "Passed: $PASSED"
    log "Failed: $FAILED"

    local success_rate=$(( (PASSED * 100) / TOTAL_TESTS ))
    log "Success rate: ${success_rate}%"

    if [ "$success_rate" -ge 80 ]; then
        log "${GREEN}✓ Overall: GOOD - Search relevance is working well${NC}"
    elif [ "$success_rate" -ge 60 ]; then
        log "${YELLOW}⚠ Overall: NEEDS IMPROVEMENT - Some relevance issues${NC}"
    else
        log "${RED}✗ Overall: POOR - Major relevance problems${NC}"
    fi

    log "${YELLOW}Monitoring complete. See $LOG_FILE for details.${NC}"
}

# Check if jq is available
if ! command -v jq &> /dev/null; then
    log "${RED}Error: jq is required for JSON parsing. Install with: sudo apt-get install jq${NC}"
    exit 1
fi

main "$@"</content>
<parameter name="filePath">/home/joshua/Documents/hollowpress/search-monitor.sh