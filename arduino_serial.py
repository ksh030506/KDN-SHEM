import pymysql
import serial
import time

ARD = serial.Serial(
    port='COM13',
    baudrate=9600,
)
while True:
# MySQL Connection 연결
    conn = pymysql.connect(host='15.164.232.202', user='root', password='0128gksqls',
                           db='shem', charset='utf8')
    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    
    # SQL문 실행
    sql = """select IFNULL(house_light,0),IFNULL(pwm,0),IFNULL(bath,0),IFNULL(induct,0),IFNULL(aircon,0)  from house """
    curs.execute(sql)
    
    # 데이타 Fetch
    rows = curs.fetchall()
    
    s = str(rows[0][0])+" "+str(rows[0][1])+" "+str(rows[0][2])+" "+str(rows[0][3])+" "+str(rows[0][4])

     # pwm bath induction aircondtion
    s = s.encode('utf-8')
    print(s)

    ARD.write(s)

    # print(rows[0])  # 첫번째 row: (1, '김정수', 1, '서울')

    # print(rows[1])  # 두번째 row: (2, '강수정', 2, '서울')
    
    # Connection 닫기
    conn.close()

    time.sleep(1)
