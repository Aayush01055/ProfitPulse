#!/bin/bash

# ProfitPulse MongoDB Docker Management Script

case "$1" in
    start)
        echo "🚀 Starting ProfitPulse MongoDB with UI..."
        docker-compose up -d
        echo ""
        echo "✅ Services started successfully!"
        echo ""
        echo "📊 Access URLs:"
        echo "   MongoDB: mongodb://localhost:27017"
        echo "   MongoDB UI: http://localhost:8081"
        echo ""
        echo "🔐 MongoDB UI Credentials:"
        echo "   Username: profitpulse"
        echo "   Password: admin123"
        echo ""
        echo "🗄️  Database Connection:"
        echo "   Database: firm_data"
        echo "   Admin User: admin"
        echo "   Admin Password: profitpulse123"
        ;;
    stop)
        echo "🛑 Stopping ProfitPulse MongoDB services..."
        docker-compose down
        echo "✅ Services stopped successfully!"
        ;;
    restart)
        echo "🔄 Restarting ProfitPulse MongoDB services..."
        docker-compose down
        docker-compose up -d
        echo "✅ Services restarted successfully!"
        ;;
    status)
        echo "📊 ProfitPulse MongoDB Service Status:"
        docker-compose ps
        ;;
    logs)
        echo "📋 Showing MongoDB logs..."
        docker-compose logs -f mongodb
        ;;
    ui-logs)
        echo "📋 Showing MongoDB UI logs..."
        docker-compose logs -f mongo-express
        ;;
    reset)
        echo "⚠️  This will delete all data. Are you sure? (y/N)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            echo "🗑️  Resetting database..."
            docker-compose down -v
            docker-compose up -d
            echo "✅ Database reset completed!"
        else
            echo "❌ Reset cancelled."
        fi
        ;;
    backup)
        echo "💾 Creating database backup..."
        mkdir -p ./backups
        BACKUP_FILE="./backups/profitpulse-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
        docker exec profitpulse-mongodb mongodump --db firm_data --archive | gzip > "$BACKUP_FILE"
        echo "✅ Backup created: $BACKUP_FILE"
        ;;
    help|*)
        echo "🔧 ProfitPulse MongoDB Docker Management"
        echo ""
        echo "Usage: $0 {start|stop|restart|status|logs|ui-logs|reset|backup|help}"
        echo ""
        echo "Commands:"
        echo "  start     - Start MongoDB and UI containers"
        echo "  stop      - Stop all containers"
        echo "  restart   - Restart all containers"
        echo "  status    - Show container status"
        echo "  logs      - Show MongoDB logs"
        echo "  ui-logs   - Show MongoDB UI logs"
        echo "  reset     - Reset database (removes all data)"
        echo "  backup    - Create database backup"
        echo "  help      - Show this help message"
        echo ""
        echo "📊 Access URLs (after starting):"
        echo "   MongoDB: mongodb://localhost:27017"
        echo "   MongoDB UI: http://localhost:8081"
        ;;
esac
