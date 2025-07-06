#!/usr/bin/env python3
"""
CSV to MongoDB Import Tool for ProfitPulse
Converts CSV files to JSON and imports them into MongoDB
"""

import pandas as pd
import pymongo
import json
import os
from pathlib import Path

class CSVToMongoImporter:
    def __init__(self, mongo_uri="mongodb://admin:profitpulse123@localhost:27017/firm_data?authSource=admin"):
        """Initialize the importer with MongoDB connection"""
        self.mongo_uri = mongo_uri
        self.client = None
        self.db = None
        
    def connect(self):
        """Connect to MongoDB"""
        try:
            self.client = pymongo.MongoClient(self.mongo_uri)
            self.db = self.client['firm_data']
            # Test connection
            self.client.admin.command('ping')
            print("✅ Connected to MongoDB successfully!")
            return True
        except Exception as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            return False
    
    def csv_to_json(self, csv_file_path, output_json_path=None):
        """Convert CSV file to JSON"""
        try:
            df = pd.read_csv(csv_file_path)
            
            # Clean column names (remove extra spaces)
            df.columns = df.columns.str.strip()
            
            # Convert to JSON-compatible format
            json_data = df.to_dict('records')
            
            if output_json_path:
                with open(output_json_path, 'w') as f:
                    json.dump(json_data, f, indent=2)
                print(f"✅ Converted {csv_file_path} to {output_json_path}")
            
            return json_data
        except Exception as e:
            print(f"❌ Error converting {csv_file_path}: {e}")
            return None
    
    def import_to_mongodb(self, collection_name, data):
        """Import data to MongoDB collection"""
        try:
            collection = self.db[collection_name]
            
            # Clear existing data
            collection.delete_many({})
            
            # Insert new data
            if data:
                result = collection.insert_many(data)
                print(f"✅ Imported {len(result.inserted_ids)} documents to {collection_name}")
                return True
            else:
                print(f"⚠️ No data to import for {collection_name}")
                return False
        except Exception as e:
            print(f"❌ Error importing to {collection_name}: {e}")
            return False
    
    def process_all_csvs(self, reference_data_dir="Refrence Data"):
        """Process all CSV files in the reference data directory"""
        csv_mappings = {
            "firm_data.financial_data.csv": "financial_data",
            "firm_data.firm_prediction.csv": "firm_prediction", 
            "firm_data.company_statuses.csv": "company_statuses",
            "firm_data.login_users.csv": "login_users",
            "american_bankruptcy.csv": "american_bankruptcy"
        }
        
        base_path = Path(reference_data_dir)
        
        for csv_file, collection_name in csv_mappings.items():
            csv_path = base_path / csv_file
            
            if csv_path.exists():
                print(f"\n🔄 Processing {csv_file}...")
                
                # Convert CSV to JSON
                json_data = self.csv_to_json(csv_path)
                
                if json_data:
                    # Import to MongoDB
                    self.import_to_mongodb(collection_name, json_data)
                    
                    # Also save as JSON file for backup
                    json_output_path = base_path / f"{collection_name}.json"
                    with open(json_output_path, 'w') as f:
                        json.dump(json_data, f, indent=2)
                    print(f"💾 Saved backup JSON: {json_output_path}")
            else:
                print(f"⚠️ File not found: {csv_path}")
    
    def add_sample_feedback(self):
        """Add sample feedback data"""
        sample_feedback = [
            {
                "category": "feature",
                "feedback": "Love the new prediction dashboard! Very intuitive.",
                "email": "user1@example.com",
                "sentiment": "positive",
                "timestamp": "2024-01-15T10:30:00Z"
            },
            {
                "category": "bug", 
                "feedback": "The profit prediction seems to be off by a significant margin.",
                "email": "user2@example.com",
                "sentiment": "critical",
                "timestamp": "2024-01-16T14:45:00Z"
            },
            {
                "category": "improvement",
                "feedback": "Would be great to have more detailed analytics charts.",
                "email": "user3@example.com",
                "sentiment": "neutral",
                "timestamp": "2024-01-17T09:15:00Z"
            }
        ]
        
        self.import_to_mongodb("feedback", sample_feedback)
        
        # Create index for feedback
        self.db.feedback.create_index("timestamp")
        print("✅ Created index on feedback.timestamp")
    
    def close(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
            print("🔌 MongoDB connection closed")

def main():
    print("🚀 ProfitPulse CSV to MongoDB Import Tool")
    print("=" * 50)
    
    # Initialize importer
    importer = CSVToMongoImporter()
    
    # Connect to MongoDB
    if not importer.connect():
        return
    
    try:
        # Process all CSV files
        importer.process_all_csvs()
        
        # Add sample feedback
        print(f"\n🔄 Adding sample feedback data...")
        importer.add_sample_feedback()
        
        print(f"\n✅ Import completed successfully!")
        print(f"\n📊 Database Summary:")
        for collection_name in importer.db.list_collection_names():
            count = importer.db[collection_name].count_documents({})
            print(f"   - {collection_name}: {count} documents")
            
    except Exception as e:
        print(f"❌ Import failed: {e}")
    finally:
        importer.close()

if __name__ == "__main__":
    main()
