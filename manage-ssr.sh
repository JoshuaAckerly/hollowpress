#!/bin/bash

# SSR Management Script for Multiple Laravel Projects
# Usage: ./manage-ssr.sh [start|stop|restart|status] [project_name]

# Configuration - Update these paths to your actual project directories
declare -A PROJECTS=(
    ["hollowpress"]="/path/to/hollowpress"
    ["project2"]="/path/to/project2"
    ["project3"]="/path/to/project3"
    ["project4"]="/path/to/project4"
    ["project5"]="/path/to/project5"
)

declare -A PORTS=(
    ["hollowpress"]="13720"
    ["project2"]="13715"
    ["project3"]="13716"
    ["project4"]="13717"
    ["project5"]="13718"
)

function stop_ssr() {
    local project=$1
    local port=${PORTS[$project]}
    
    echo "Stopping SSR for $project on port $port..."
    
    # Kill processes using the port
    if command -v lsof >/dev/null; then
        # Unix/Linux/Mac
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    else
        # Windows (if running in Git Bash or similar)
        netstat -ano | findstr ":$port" | awk '{print $5}' | xargs -I {} taskkill /PID {} /F 2>/dev/null || true
    fi
    
    echo "SSR stopped for $project"
}

function start_ssr() {
    local project=$1
    local project_path=${PROJECTS[$project]}
    local port=${PORTS[$project]}
    
    if [ ! -d "$project_path" ]; then
        echo "Error: Project directory $project_path does not exist"
        return 1
    fi
    
    echo "Starting SSR for $project on port $port..."
    
    cd "$project_path"
    
    # Check if .env has correct port
    if ! grep -q "INERTIA_SSR_PORT=$port" .env 2>/dev/null; then
        echo "Warning: .env file doesn't have INERTIA_SSR_PORT=$port"
        echo "Please add: INERTIA_SSR_PORT=$port to your .env file"
    fi
    
    # Build SSR if needed
    if [ ! -f "bootstrap/ssr/ssr.js" ]; then
        echo "Building SSR bundle..."
        npm run build:ssr
    fi
    
    # Start SSR in background
    nohup node bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
    echo "SSR started for $project (PID: $!)"
}

function status_ssr() {
    local project=$1
    local port=${PORTS[$project]}
    
    if command -v lsof >/dev/null; then
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [ -n "$pid" ]; then
            echo "$project: Running on port $port (PID: $pid)"
        else
            echo "$project: Not running on port $port"
        fi
    else
        echo "$project: Port $port status check not available on this system"
    fi
}

function show_help() {
    echo "Usage: $0 [start|stop|restart|status] [project_name|all]"
    echo ""
    echo "Available projects:"
    for project in "${!PROJECTS[@]}"; do
        echo "  - $project (port ${PORTS[$project]})"
    done
    echo ""
    echo "Examples:"
    echo "  $0 start hollowpress"
    echo "  $0 stop all"
    echo "  $0 status all"
    echo "  $0 restart project2"
}

# Main script logic
action=$1
target=$2

if [ -z "$action" ] || [ -z "$target" ]; then
    show_help
    exit 1
fi

case $action in
    start)
        if [ "$target" = "all" ]; then
            for project in "${!PROJECTS[@]}"; do
                start_ssr "$project"
            done
        elif [ -n "${PROJECTS[$target]}" ]; then
            start_ssr "$target"
        else
            echo "Unknown project: $target"
            show_help
            exit 1
        fi
        ;;
    stop)
        if [ "$target" = "all" ]; then
            for project in "${!PROJECTS[@]}"; do
                stop_ssr "$project"
            done
        elif [ -n "${PROJECTS[$target]}" ]; then
            stop_ssr "$target"
        else
            echo "Unknown project: $target"
            show_help
            exit 1
        fi
        ;;
    restart)
        if [ "$target" = "all" ]; then
            for project in "${!PROJECTS[@]}"; do
                stop_ssr "$project"
                sleep 2
                start_ssr "$project"
            done
        elif [ -n "${PROJECTS[$target]}" ]; then
            stop_ssr "$target"
            sleep 2
            start_ssr "$target"
        else
            echo "Unknown project: $target"
            show_help
            exit 1
        fi
        ;;
    status)
        if [ "$target" = "all" ]; then
            for project in "${!PROJECTS[@]}"; do
                status_ssr "$project"
            done
        elif [ -n "${PROJECTS[$target]}" ]; then
            status_ssr "$target"
        else
            echo "Unknown project: $target"
            show_help
            exit 1
        fi
        ;;
    *)
        echo "Unknown action: $action"
        show_help
        exit 1
        ;;
esac