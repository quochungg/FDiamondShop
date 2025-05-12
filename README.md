# Diamond Shop System - SWP391 project
# Team's Member

- Frontend
  
  - Nguyen Thi Bich Duyen - SE183629
  - Doan Dang Thien Bao - SE171827
    
- Backend
  
  - Nguyen Huu Quoc Hung - SE172905
  - Ha Duy Tung - SE173573
  - Tran Nguyen Thu An - SE182972
# 1.Requirement:
## About

This is an online jewelry retailer specializing in custom-designed diamonds and fine jewelry. Leveraging advanced imaging technology, we offer our customers the ability to view and select high-quality diamonds and settings to create personalized pieces. Our platform provides an educational and transparent buying process, ensuring every customer can make informed decisions with ease. At [FDiamond Shop], we are committed to exceptional customer service, ethical sourcing.
- Project Tracking
  
  https://docs.google.com/spreadsheets/d/1_KQ_Ekz96dBMHueeMBkS5EH1SxAo9njEWgm_3NB2ejU/edit?usp=sharing
  
- Usecase List

  https://docs.google.com/spreadsheets/d/1uiBUuUwCw7POmWJfGRHV07HYhllTbghzrYamDNfgfLc/edit?usp=sharing

- API Postman

  https://documenter.getpostman.com/view/36189969/2sA3kSoiHt
  
- SRS

  https://docs.google.com/document/d/1KStpC8Z2f0te3t9XLxPAABaqf7SuWLAN/edit?usp=sharing&ouid=108552960582977013912&rtpof=true&sd=true
## 1.Feature
### Feature 1: Account Management
#### FE-01: User Authentication and Registration
FR1.1: Login as Customer (via Gmail or other methods)

FR1.2: Login as Administrator

FR2.1: Register Customer

FR2.2: Register Administrator

FR3: Forgot Password

FR4: Update Account Information

### Feature 2: Product Management
#### FE-02: Product Catalogue Management
FR5.1: Search Products by ID/Name

FR5.2: Filter Products (Customer and Admin Views)

FR5.3: Sort Products

FR5.4: View Product Details

FR5.5: Add New Products (Admin)

FR5.6: Edit Product Details (Admin)

FR5.7: Delete Products (Admin)

### Feature 3: Order Management
#### FE-03: Order Processing and Fulfilment
FR6.1: Create Order

FR6.2: Add Products to Cart

FR6.3: View Cart and Cart Lines

FR6.4: Remove Cart Lines or Items

FR6.5: Apply Voucher to Payment

FR6.6: Execute Payment (Momo, PayPal, VnPay)

FR6.7: View Order History and Details

FR6.8: Cancel Order (Manually or Automatically)

### Feature 4: Discount Management
#### FE-04: Promotions and Discounts
FR7.1: Create and Manage Discount Codes

FR7.2: Apply Discounts to Orders

FR7.3: Search Discount by Name

### Feature 5: Admin Report Management
#### FE-05: Reporting and Analytics
FR8.1: Generate Sales Reports

FR8.2: View Customer Analytics

FR8.3: View Product Analytics

FR8.4: View Order Analytics

### Feature 6: Delivery Management
#### FE-06 : Manage delivery
FR9: Assign order to delivery staffs

FR10: Update order status
## 2.GUI:
<details>
  <summary>Click me</summary><br>
  
### 2.1 Customer Pages
#### Sign in & Sign up page
![image](https://github.com/user-attachments/assets/c0f06bfb-a845-4b98-82b2-712a5cf059bb)
![image](https://github.com/user-attachments/assets/a0d353a9-c831-4477-9dd8-01521d7893e6)
#### Home page
![image](https://github.com/user-attachments/assets/0a309469-f200-4406-8200-a545b41066ae)
#### Product page
![image](https://github.com/user-attachments/assets/f2a2c754-7aeb-4f6a-b10f-c863d8853d98)
#### Product details page
![image](https://github.com/user-attachments/assets/53c16d8d-dd76-4661-aa08-ea3043e1af2f)
#### Shopping Cart page
![image](https://github.com/user-attachments/assets/36bf6037-0ee8-4635-a9f2-829940301409)
#### Discount Code page
![image](https://github.com/user-attachments/assets/7771cd5a-f412-47d6-85c3-afd8b5ddcc38)
#### Checkout page
![image](https://github.com/user-attachments/assets/1e571ed5-963a-435d-858d-59f1ca38ff4d)
#### Successful payment page
![image](https://github.com/user-attachments/assets/c32c7dde-b2b6-4b2c-9a6b-3c0e87e65324)
#### Order history page
![image](https://github.com/user-attachments/assets/e78e3e65-5c28-4ebc-9181-0ab76be52b98)
#### Account detail page
![image](https://github.com/user-attachments/assets/eac5d948-2853-4c44-8882-90b281ee472b)
### 2.2 Admin Pages
#### Sign in % Sign up page
![image](https://github.com/user-attachments/assets/d7133f09-6dbb-40cd-ba78-bfb2fdac788c)
#### Manage staffs page
![image](https://github.com/user-attachments/assets/67279aa5-06a3-42aa-8e22-21cf562ab254)
#### Add new staff page
![image](https://github.com/user-attachments/assets/30b2efc8-bce9-4301-8ee3-fd0224c16d8e)
#### Manage products page
![image](https://github.com/user-attachments/assets/67477c60-695d-4f8b-b272-8ea029e85360)
#### Add new product page
![image](https://github.com/user-attachments/assets/4eca187f-ab9e-4b2b-967d-72c82dfa708d)
#### Manage orders page
![image](https://github.com/user-attachments/assets/6a7f80d7-368b-4267-b54c-610ec8071175)
#### Order detail page
![image](https://github.com/user-attachments/assets/4c892bc3-6390-46bf-ab12-352154074915)
#### Add new discount page
![image](https://github.com/user-attachments/assets/44020d25-080f-42cd-82b6-b28f5f0d6e2a)
</details>

## 3.Database Design
<details>
  <summary>Click me</summary><br>

### ERD
https://drive.google.com/file/d/1p8GJO6FrXx7xXIC5sYxDu3W2-M5W4R72/view?usp=sharing
![image](https://github.com/user-attachments/assets/7d2dd642-c1b7-4fd3-8e90-9c79b51d3697)
</details>

## 4.Conclusion
The Diamond Shop System (SWP391) is a comprehensive solution tailored for online jewelry retail. It specializes in custom-designed diamonds and fine jewelry, leveraging advanced imaging technology and a user-centric design to offer customers an educational and transparent buying experience. This system includes features such as account management, product management, order processing, discount management, admin reporting, and delivery management. The backend and frontend teams have collaboratively developed a robust platform that ensures high-quality service, efficient order fulfillment, and a seamless user experience. Through continuous updates and enhancements, we are committed to maintaining exceptional customer service and ethical sourcing standards. Thank you for exploring our project. We welcome feedback and contributions to help us improve and expand the system.
