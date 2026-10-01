from datetime import datetime
import secrets,string
from data import load_data,save_data
from books import get_books
from members import get_members
F='transactions.json'

# SANDHU
def get_transactions(): return load_data(F)
def ref(p): return p+'-'+datetime.now().strftime('%y%m%d%H%M%S')+'-'+''.join(secrets.choice(string.ascii_uppercase+string.digits) for _ in range(4))
def tx(book_id,member_id,action,payment='N/A'):
    b=get_books(); m=get_members(); book=next((x for x in b if int(x['id'])==int(book_id)),None); mem=next((x for x in m if int(x['id'])==int(member_id)),None)
    if not book: raise ValueError('Book not found.')
    if not mem: raise ValueError('Member not found.')
    action=action.upper()
    if action in ('ISSUE','RENT','BUY') and book['status']!='Available': raise ValueError('Book is not available.')
    amount=0


    # SANDHU
    if action=='ISSUE': book['status']='Issued'
    elif action=='RENT': book['status']='Rented'; amount=book['rental_price']
    elif action=='BUY': book['status']='Sold'; amount=book['price']
    else: raise ValueError('Invalid action.')
    t=get_transactions(); x={'id':max([z['id'] for z in t],default=0)+1,'transaction_id':ref('TXN'),'reference_id':ref('REF'),'book_id':book['id'],'member_id':mem['id'],'book_title':book['title'],'member_name':mem['name'],'action':action,'amount':amount,'payment_mode':payment,'date':datetime.now().strftime('%Y-%m-%d %H:%M:%S'),'status':'Active' if action in ('ISSUE','RENT') else 'Completed'}; t.append(x); save_data('books.json',b); save_data(F,t); return x
def issue_book(b,m): return tx(b,m,'ISSUE')
def rent_book(b,m,p): return tx(b,m,'RENT',p)
def buy_book(b,m,p): return tx(b,m,'BUY',p)
def return_book(book_id):
    b=get_books(); book=next((x for x in b if int(x['id'])==int(book_id)),None)
    if not book or book['status'] not in ('Issued','Rented'): raise ValueError('Book is not currently issued or rented.')
    t=get_transactions(); active=next((x for x in reversed(t) if int(x['book_id'])==int(book_id) and x['action'] in ('ISSUE','RENT') and x['status']=='Active'),None)
    if not active: raise ValueError('Active transaction not found.')
    book['status']='Available'; active['status']='Completed'; active['return_date']=datetime.now().strftime('%Y-%m-%d %H:%M:%S'); save_data('books.json',b); save_data(F,t); return active


# SANDHU