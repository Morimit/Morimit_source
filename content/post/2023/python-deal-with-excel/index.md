---
title: "Python Deal With Excel"
description: 使用openpyxl库将每日微信接龙录入到考勤表
date: 2023-10-05T09:58:39+08:00
lastmod: 2023-10-13T10:22:39+08:00
image: openpyxl.PNG
license: 
tags:
    - Python
hidden: false
draft: false
---
## 需求
将微信接龙打卡更新到考勤表中，已到的人✔，未到的人❌

## 思路拆分
对比两列，一列是人员姓名（固定列），一列是此人当日打卡情况。每次微信打卡后，复制接龙到表格的对比列中，如果固定列的名字有出现在对比列中，则更新当日打卡记录。


```python
cells = sheet['A3:A11'] #固定列
cells2 = sheet['N3:N12'] #对比列
cells3 = sheet['C3:C11'] #保存到新列，每日更新
```
  

| 姓名\日期 | 10月5日 | 10月6日 |
| --------- | ------- | ------- |
| 张三      | ✔       | ✔       |
| 李四      | ❌      | ✔       |
| 王五      | ✔       | ✔       |


使用的python包：openpyxsl模块
参考教程：https://blog.csdn.net/weixin_44288604/article/details/120731317

 

```python
import os
import openpyxl
import chardet
import codecs


path = r"C:\\Users\\DELL\\Desktop\\work"
os.chdir(path)  # 修改工作路径

workbook = openpyxl.load_workbook('志愿者考勤表.xlsx')	# 返回一个workbook数据类型的值
# print(workbook.sheetnames)	# 打印Excel表中的所有表

# 选择工作表
sheet = workbook['Sheet1']  # 获取指定sheet表

cells = sheet['A3:A11'] #固定列
cells2 = sheet['N3:N12'] #对比列
cells3 = sheet['C3:C11'] #保存到新列，每日更新

for i in cells:
    for j in i:
        # 打印A3到A11的数据
        # print(j.value)
        for k in cells2:
            for l in k:
                # 打印N3到N12的数据
                # print(l.value)
                if(l.value != None):
                    if(j.value.find(l.value) == -1):
                        print(l.row)
                    else:
                        sheet["C{}".format(j.row)].value = '✔'
for k in cells3:
    for l in k:
        if( sheet["C{}".format(l.row)].value != '✔'):
            print(l.row)
            sheet["C{}".format(l.row)].value = '×'
            
            
workbook.save('志愿者考勤表.xlsx') #记得保存，否则更改不生效
```


## 需求变更
- [ ] 要求整张表的行列对调

| 日期\姓名 | 张三 | 李四 | 王五 |
| --------- | ---- | ---- | ---- |
| 10月5日   | ✔    | ❌    | ✔     |
| 10月6日   | ✔   | ✔    |  ✔    |

 

```python
import os
import openpyxl
import chardet
import codecs


path = r"C:\\Users\\DELL\\Desktop\\work\\考勤表"
os.chdir(path)  # 修改工作路径

workbook = openpyxl.load_workbook('志愿者考勤表.xlsx')	# 返回一个workbook数据类型的值
# print(workbook.sheetnames)	# 打印Excel表中的所有表

# 选择工作表
sheet = workbook['Sheet1']  # 获取指定sheet表
alignment = openpyxl.styles.Alignment(horizontal="center", vertical="center", text_rotation=0, wrap_text=True) # 设置对齐格式
def columnletter(col):
    letter = [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
    return letter[col]

for i in sheet.iter_rows(min_row=2, max_row=2, min_col=2, max_col=10):
    for j in i:
        # 打印固定行（姓名行）
        # print(j.value)
        for k in sheet.iter_rows(min_row=16, max_row=16, min_col=1, max_col=10):
            for l in k:
                # 打印对比行（excel手动转置）
                # print(l.value)
                if(l.value != None):
                    if(j.value.find(l.value) == -1):
                        #print(l.column) #注意打印出来的是数字，而不是字母
                    else:
                        # -----------------------
                        #新信息注入新行，打勾     
                        # -----------------------------
                        sheet["{}5".format(columnletter(j.column))].value = '✔'
                        sheet["{}5".format(columnletter(j.column))].alignment = alignment
# -----------------------------                        
#新信息注入新行，打叉            
# -----------------------------            
for k in sheet.iter_rows(min_row=5, max_row=5, min_col=2, max_col=10):
    for l in k:
        if( sheet["{}5".format(columnletter(l.column))].value != '✔'):
            print(l.column)
            sheet["{}5".format(columnletter(l.column))].value = '×'
            sheet["{}5".format(columnletter(l.column))].alignment = alignment            
            
workbook.save('志愿者考勤表.xlsx')
```
  
