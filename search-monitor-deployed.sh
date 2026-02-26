#!/bin/bash

# HollowPress Search Relevance Monitor - Inertia Compatible Version
# Tests search functionality with Inertia.js responses

BASE_URL="http://hollowpress.graveyardjokes.local"
LOG_FILE="./logs/search-monitor.log"

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
    ["React Component"]="React Component Patterns"
    ["Laravel"]="Laravel Best Practices"
    ["framework"]="Laravel Best Practices"
)

PASSED=0
FAILED=0
TOTAL_TESTS=0

test_search() {
    local query="$1"
    local expected_title="$2"

    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    log "${BLUE}Testing: $query${NC}"
    log "Expected: '$expected_title'"

    # Make search request to Inertia endpoint
    local response=$(curl -s "${BASE_URL}/posts?q=${query// /%20}")

    if [ $? -ne 0 ]; then
        log "${RED}✗ Request failed${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

    # Extract JSON data from Inertia page
    # Look for the data-page attribute in the HTML
    local json_data=$(echo "$response" | grep -o 'data-page="[^"]*"' | sed 's/data-page="//' | sed 's/"$//' | head -1)

    if [ -z "$json_data" ]; then
        log "${RED}✗ No Inertia data found${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

    # URL decode the JSON
    json_data=$(echo "$json_data" | sed 's/&quot;/"/g' | sed 's/&amp;/\&/g' | sed 's/&lt;/</g' | sed 's/&gt;/>/g')

    # Extract posts from the props
    local posts_data=$(echo "$json_data" | jq -r '.props.posts.data // empty' 2>/dev/null)

    if [ -z "$posts_data" ] || [ "$posts_data" = "null" ]; then
        log "${RED}✗ No posts data found${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

    # Get the first post
    local first_post=$(echo "$posts_data" | jq -r '.[0] // empty' 2>/dev/null)

    if [ -z "$first_post" ] || [ "$first_post" = "null" ]; then
        log "${RED}✗ No posts in results${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

    # Extract title from first post
    local first_title=$(echo "$first_post" | jq -r '.title // empty' 2>/dev/null)

    log "Results count: $(echo "$posts_data" | jq length)"
    log "Actual top result: '$first_title'"

    if [ "$first_title" = "$expected_title" ]; then
        log "${GREEN}✓ PASS - Correct result${NC}"
        PASSED=$((PASSED + 1))
    else
        log "${RED}✗ FAIL - Expected '$expected_title', got '$first_title'${NC}"
        FAILED=$((FAILED + 1))
    fi

    echo ""
}

main() {
    log "${BLUE}Starting HollowPress Search Relevance Monitor${NC}"
    log "Base URL: $BASE_URL"

    # Test basic functionality
    for query in "${!TEST_QUERIES[@]}"; do
        test_search "$query" "${TEST_QUERIES[$query]}"
    done

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
    else
        log "${RED}✗ Overall: POOR - Search relevance needs improvement${NC}"
    fi

    log "Monitoring complete. See $LOG_FILE for details."
}

# Check dependencies
if ! command -v jq &> /dev/null; then
    log "${RED}Error: jq is required. Install with: sudo apt-get install jq${NC}"
    exit 1
fi

if ! command -v curl &> /dev/null; then
    log "${RED}Error: curl is required. Install with: sudo apt-get install curl${NC}"
    exit 1
fi

main "$@"