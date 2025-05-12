import sqlite3
import csv
from datetime import datetime

# 配置参数
CSV_FILE = 'contacts.csv'  # CSV 文件路径
DB_PATH = 'cool.sqlite'  # SQLite 数据库路径
TENANT_ID = None  # 若 tenantId 需固定值，在此指定（例如 1）
BATCH_SIZE = 500  # 每批提交的数据量

def import_contacts():
    # 连接数据库
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 读取 CSV 并插入数据
    with open(CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        batch = []
        total = 0

        for row in reader:
            current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            data = {
                "createTime": current_time,
                "updateTime": current_time,
                "name": row['name'][:50],
                "company": row.get('company', '')[:100],
                "position": row.get('position', '')[:50],
                "phone": row.get('phone', '')[:30],
                "email": row.get('email', '')[:120],
                "misc": row.get('misc', ''),
                "path": row.get('path', ''),
                "tenantId": TENANT_ID,
                "remark": row.get('remark', '')
            }
            batch.append(data)

            if len(batch) >= BATCH_SIZE:
                cursor.executemany('''
                    INSERT INTO contact_info (
                        createTime, updateTime, name, company, position,
                        phone, email, misc, path, tenantId, remark
                    ) VALUES (
                        :createTime, :updateTime, :name, :company, :position,
                        :phone, :email, :misc, :path, :tenantId, :remark
                    )
                ''', batch)
                conn.commit()
                total += len(batch)
                batch = []

        # 插入剩余未满一批的数据
        if batch:
            cursor.executemany('''
                INSERT INTO contact_info (
                    createTime, updateTime, name, company, position,
                    phone, email, misc, path, tenantId, remark
                ) VALUES (
                    :createTime, :updateTime, :name, :company, :position,
                    :phone, :email, :misc, :path, :tenantId, :remark
                )
            ''', batch)
            conn.commit()
            total += len(batch)

    conn.close()
    print(f"成功导入 {total} 条数据")

if __name__ == '__main__':
    import_contacts()
