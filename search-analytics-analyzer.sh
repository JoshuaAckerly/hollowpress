#!/bin/bash

# HollowPress Search Analytics Analyzer
# Analyzes search performance data and generates insights

ANALYTICS_DIR="./analytics/search"
REPORTS_DIR="./reports/search"
LOG_FILE="./logs/search-analytics.log"

# Create directories
mkdir -p "$REPORTS_DIR"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    echo -e "$message"
}

generate_weekly_report() {
    log "INFO" "${BLUE}Generating weekly search analytics report...${NC}"

    local week_start=$(date -d '7 days ago' +%Y-%m-%d)
    local week_end=$(date +%Y-%m-%d)
    local report_file="$REPORTS_DIR/weekly-$(date +%Y-%m-%d).json"

    # Find analytics files for the past week
    local analytics_files=$(find "$ANALYTICS_DIR" -name "*.json" -newermt "$week_start" ! -newermt "$week_end" 2>/dev/null)

    if [ -z "$analytics_files" ]; then
        log "WARN" "No analytics data found for the past week"
        return 1
    fi

    # Aggregate data
    local total_tests=0
    local total_passed=0
    local total_failed=0
    local total_response_time=0
    local slow_responses=0
    local query_performance="{}"
    local failure_patterns="{}"

    for file in $analytics_files; do
        if [ -f "$file" ]; then
            # Aggregate metrics
            local tests_count=$(jq '.tests | length' "$file" 2>/dev/null || echo 0)
            local passed_count=$(jq '[.tests[] | select(.result == "passed")] | length' "$file" 2>/dev/null || echo 0)
            local failed_count=$((tests_count - passed_count))
            local avg_response=$(jq '.metrics.avg_response_time // 0' "$file" 2>/dev/null || echo 0)
            local slow_count=$(jq '.metrics.slow_responses // 0' "$file" 2>/dev/null || echo 0)

            total_tests=$((total_tests + tests_count))
            total_passed=$((total_passed + passed_count))
            total_failed=$((total_failed + failed_count))
            total_response_time=$((total_response_time + (avg_response * tests_count)))
            slow_responses=$((slow_responses + slow_count))

            # Collect query performance data
            local query_data=$(jq '{
                queries: [.tests[] | {query: .query, result: .result, response_time: .response_time}]
            }' "$file" 2>/dev/null || echo '{"queries":[]}')

            query_performance=$(jq --argjson new "$query_data" '.queries += $new.queries' <<< "$query_performance" 2>/dev/null || echo "$query_performance")

            # Collect failure patterns
            local failures=$(jq '[.tests[] | select(.result != "passed") | {query: .query, result: .result}]' "$file" 2>/dev/null || echo '[]')
            failure_patterns=$(jq --argjson new "$failures" '. + $new' <<< "$failure_patterns" 2>/dev/null || echo "$failure_patterns")
        fi
    done

    # Calculate averages
    local success_rate=0
    local avg_response_time=0
    if [ $total_tests -gt 0 ]; then
        success_rate=$(( (total_passed * 100) / total_tests ))
        avg_response_time=$((total_response_time / total_tests))
    fi

    # Generate insights
    local insights=$(generate_insights "$query_performance" "$failure_patterns" "$success_rate" "$avg_response_time")

    # Create report
    local report=$(jq -n \
        --arg week_start "$week_start" \
        --arg week_end "$week_end" \
        --arg total_tests "$total_tests" \
        --arg success_rate "$success_rate" \
        --arg avg_response_time "$avg_response_time" \
        --arg slow_responses "$slow_responses" \
        --argjson insights "$insights" \
        '{
            report_type: "weekly",
            period: {start: $week_start, end: $week_end},
            summary: {
                total_tests: ($total_tests | tonumber),
                success_rate: ($success_rate | tonumber),
                avg_response_time: ($avg_response_time | tonumber),
                slow_responses: ($slow_responses | tonumber)
            },
            insights: $insights,
            generated_at: (now | strftime("%Y-%m-%dT%H:%M:%SZ"))
        }')

    echo "$report" > "$report_file"
    log "INFO" "Weekly report saved to: $report_file"

    return 0
}

generate_insights() {
    local query_performance=$1
    local failure_patterns=$2
    local success_rate=$3
    local avg_response_time=$4

    local insights='[]'

    # Success rate insights
    if [ "$success_rate" -ge 90 ]; then
        insights=$(jq '. + [{"type":"performance","level":"excellent","message":"Search relevance is performing excellently","metric":"success_rate","value":'"$success_rate"'}]' <<< "$insights")
    elif [ "$success_rate" -ge 80 ]; then
        insights=$(jq '. + [{"type":"performance","level":"good","message":"Search relevance is performing well","metric":"success_rate","value":'"$success_rate"'}]' <<< "$insights")
    elif [ "$success_rate" -ge 70 ]; then
        insights=$(jq '. + [{"type":"performance","level":"needs_improvement","message":"Search relevance needs improvement","metric":"success_rate","value":'"$success_rate"'}]' <<< "$insights")
    else
        insights=$(jq '. + [{"type":"performance","level":"critical","message":"Search relevance requires immediate attention","metric":"success_rate","value":'"$success_rate"'}]' <<< "$insights")
    fi

    # Response time insights
    if [ "$avg_response_time" -lt 200 ]; then
        insights=$(jq '. + [{"type":"performance","level":"good","message":"Response times are excellent","metric":"avg_response_time","value":'"$avg_response_time"'}]' <<< "$insights")
    elif [ "$avg_response_time" -lt 300 ]; then
        insights=$(jq '. + [{"type":"performance","level":"acceptable","message":"Response times are acceptable","metric":"avg_response_time","value":'"$avg_response_time"'}]' <<< "$insights")
    else
        insights=$(jq '. + [{"type":"performance","level":"poor","message":"Response times need optimization","metric":"avg_response_time","value":'"$avg_response_time"'}]' <<< "$insights")
    fi

    # Query performance insights
    local slow_queries=$(jq '[.[] | select(.response_time > 500)] | length' <<< "$query_performance" 2>/dev/null || echo 0)
    if [ "$slow_queries" -gt 0 ]; then
        insights=$(jq '. + [{"type":"optimization","level":"warning","message":"'"$slow_queries"' queries are running slowly","metric":"slow_queries","value":'"$slow_queries"'}]' <<< "$insights")
    fi

    # Failure pattern insights
    local top_failures=$(jq '[.[] | .query] | group_by(.) | map({query: .[0], count: length}) | sort_by(.count) | reverse | .[0:3]' <<< "$failure_patterns" 2>/dev/null || echo '[]')
    local failure_count=$(jq length <<< "$top_failures")
    if [ "$failure_count" -gt 0 ]; then
        insights=$(jq --argjson failures "$top_failures" '. + [{"type":"relevance","level":"info","message":"Top failing queries identified","metric":"top_failures","value":$failures}]' <<< "$insights")
    fi

    echo "$insights"
}

generate_trend_analysis() {
    log "INFO" "${BLUE}Generating trend analysis...${NC}"

    local days=30
    local trend_file="$REPORTS_DIR/trends-$(date +%Y-%m-%d).json"

    # Collect data for the past 30 days
    local trend_data='[]'

    for i in $(seq 0 $((days-1))); do
        local date=$(date -d "$i days ago" +%Y-%m-%d)
        local analytics_file="$ANALYTICS_DIR/${date}.json"

        if [ -f "$analytics_file" ]; then
            local day_data=$(jq '{
                date: .date,
                success_rate: (.metrics.success_rate // 0),
                avg_response_time: (.metrics.avg_response_time // 0),
                total_tests: (.metrics.total_searches // 0)
            }' "$analytics_file" 2>/dev/null || echo '{}')

            trend_data=$(jq --argjson day "$day_data" '. + [$day]' <<< "$trend_data")
        fi
    done

    # Calculate trends
    local avg_success_rate=$(jq '[.[] | select(.success_rate > 0)] | if length > 0 then (map(.success_rate) | add) / length else 0 end' <<< "$trend_data")
    local avg_response_time=$(jq '[.[] | select(.avg_response_time > 0)] | if length > 0 then (map(.avg_response_time) | add) / length else 0 end' <<< "$trend_data")

    # Calculate trend direction (simple linear trend)
    local success_trend=$(calculate_trend "$trend_data" "success_rate")
    local response_trend=$(calculate_trend "$trend_data" "avg_response_time")

    local trend_report=$(jq -n \
        --argjson data "$trend_data" \
        --arg avg_success "$avg_success_rate" \
        --arg avg_response "$avg_response_time" \
        --arg success_trend "$success_trend" \
        --arg response_trend "$response_trend" \
        '{
            report_type: "trends",
            period_days: 30,
            averages: {
                success_rate: ($avg_success | tonumber),
                response_time: ($avg_response | tonumber)
            },
            trends: {
                success_rate: $success_trend,
                response_time: $response_trend
            },
            daily_data: $data,
            generated_at: (now | strftime("%Y-%m-%dT%H:%M:%SZ"))
        }')

    echo "$trend_report" > "$trend_file"
    log "INFO" "Trend analysis saved to: $trend_file"
}

calculate_trend() {
    local data=$1
    local field=$2

    # Simple trend calculation: compare first half vs second half averages
    local count=$(jq length <<< "$data")
    local midpoint=$((count / 2))

    if [ $count -lt 4 ]; then
        echo "insufficient_data"
        return
    fi

    local first_half_avg=$(jq "[.[0:$midpoint] | select(.$field > 0)] | if length > 0 then (map(.$field) | add) / length else 0 end" <<< "$data")
    local second_half_avg=$(jq "[.[$midpoint:] | select(.$field > 0)] | if length > 0 then (map(.$field) | add) / length else 0 end" <<< "$data")

    if (( $(echo "$second_half_avg > $first_half_avg * 1.05" | bc -l) )); then
        echo "improving"
    elif (( $(echo "$second_half_avg < $first_half_avg * 0.95" | bc -l) )); then
        echo "declining"
    else
        echo "stable"
    fi
}

generate_recommendations() {
    log "INFO" "${BLUE}Generating tuning recommendations...${NC}"

    local recommendations_file="$REPORTS_DIR/recommendations-$(date +%Y-%m-%d).json"
    local tuning_file="./tuning/search/tuning-recommendations.json"

    local recommendations='[]'

    # Read current tuning recommendations
    if [ -f "$tuning_file" ]; then
        recommendations=$(jq '.recommendations // []' "$tuning_file" 2>/dev/null || echo '[]')
    fi

    # Add general recommendations based on recent performance
    local recent_weekly="$REPORTS_DIR/weekly-$(date +%Y-%m-%d).json"
    if [ -f "$recent_weekly" ]; then
        local success_rate=$(jq '.summary.success_rate' "$recent_weekly" 2>/dev/null || echo 0)
        local avg_response=$(jq '.summary.avg_response_time' "$recent_weekly" 2>/dev/null || echo 0)

        if [ "$success_rate" -lt 80 ]; then
            recommendations=$(jq '. + [{
                "id": "relevance_tuning_'$(date +%s)'",
                "type": "relevance",
                "priority": "high",
                "title": "Improve Search Relevance",
                "description": "Current success rate is '"$success_rate"'%. Consider adjusting scoring weights or improving content indexing.",
                "actions": [
                    "Review PostController search scoring logic",
                    "Add more comprehensive test queries",
                    "Consider implementing search analytics in the application"
                ],
                "generated_at": (now | strftime("%Y-%m-%dT%H:%M:%SZ"))
            }]' <<< "$recommendations")
        fi

        if [ "$avg_response" -gt 300 ]; then
            recommendations=$(jq '. + [{
                "id": "performance_optimization_'$(date +%s)'",
                "type": "performance",
                "priority": "medium",
                "title": "Optimize Search Performance",
                "description": "Average response time is '"$avg_response"'ms. Consider database optimization.",
                "actions": [
                    "Add database indexes on title, content, and author_name columns",
                    "Implement search result caching",
                    "Consider search query optimization"
                ],
                "generated_at": (now | strftime("%Y-%m-%dT%H:%M:%SZ"))
            }]' <<< "$recommendations")
        fi
    fi

    local final_report=$(jq -n \
        --argjson recommendations "$recommendations" \
        '{
            report_type: "recommendations",
            recommendations: $recommendations,
            generated_at: (now | strftime("%Y-%m-%dT%H:%M:%SZ"))
        }')

    echo "$final_report" > "$recommendations_file"
    log "INFO" "Recommendations report saved to: $recommendations_file"
}

main() {
    log "INFO" "${PURPLE}Starting Search Analytics Analysis${NC}"

    # Generate reports
    generate_weekly_report
    generate_trend_analysis
    generate_recommendations

    log "INFO" "${PURPLE}Analytics analysis complete${NC}"
    log "INFO" "Reports available in: $REPORTS_DIR"
}

# Check dependencies
if ! command -v jq &> /dev/null; then
    echo "${RED}Error: jq is required for JSON processing${NC}"
    exit 1
fi

main "$@"</content>
<parameter name="filePath">/home/joshua/Documents/hollowpress/search-analytics-analyzer.sh