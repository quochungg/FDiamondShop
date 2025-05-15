# 💎 Diamond Shop System – SWP391 Project

## 👥 Team Members

### 🔹 Frontend Team
- **Nguyen Thi Bich Duyen** – SE183629  
- **Doan Dang Thien Bao** – SE171827  

### 🔸 Backend Team
- **Nguyen Huu Quoc Hung** – SE172905  
- **Ha Duy Tung** – SE173573  
- **Tran Nguyen Thu An** – SE182972  

---

## 📌 1. Project Overview

### 📖 About

**Diamond Shop System** is an online jewelry retailer specializing in **custom-designed diamonds** and **fine jewelry**. The platform utilizes **advanced imaging technology** to allow customers to view and customize products, ensuring an **educational and transparent buying experience**. 

We are committed to:
- Exceptional customer service  
- Ethical sourcing  
- User-centric design  

> **Project Tracking**: [Google Sheet](https://docs.google.com/spreadsheets/d/1_KQ_Ekz96dBMHueeMBkS5EH1SxAo9njEWgm_3NB2ejU/edit?usp=sharing)  
> **Use Case List**: [Google Sheet](https://docs.google.com/spreadsheets/d/1uiBUuUwCw7POmWJfGRHV07HYhllTbghzrYamDNfgfLc/edit?usp=sharing)  
> **API Documentation**: [Postman](https://documenter.getpostman.com/view/36189969/2sA3kSoiHt)  
> **SRS Document**: [Google Docs](https://docs.google.com/document/d/1KStpC8Z2f0te3t9XLxPAABaqf7SuWLAN/edit?usp=sharing&ouid=108552960582977013912&rtpof=true&sd=true)

---

## 🚀 2. Features

### 🧑‍💼 Account Management
- FR1.1: Login as Customer (via Gmail or Email)  
- FR1.2: Login as Administrator  
- FR2.1: Register as Customer  
- FR2.2: Register as Administrator  
- FR3: Forgot Password  
- FR4: Update Account Information  

### 💍 Product Management
- FR5.1: Search Products by ID/Name  
- FR5.2: Filter Products (Customer & Admin Views)  
- FR5.3: Sort Products  
- FR5.4: View Product Details  
- FR5.5: Add New Products (Admin)  
- FR5.6: Edit Product Details (Admin)  
- FR5.7: Delete Products (Admin)  

### 📦 Order Management
- FR6.1: Create Order  
- FR6.2: Add Products to Cart  
- FR6.3: View Cart and Cart Lines  
- FR6.4: Remove Items from Cart  
- FR6.5: Apply Voucher to Payment  
- FR6.6: Execute Payment (MoMo, PayPal, VnPay)  
- FR6.7: View Order History and Details  
- FR6.8: Cancel Orders (Manually or Automatically)  

### 🎟 Discount Management
- FR7.1: Create and Manage Discount Codes  
- FR7.2: Apply Discounts to Orders  
- FR7.3: Search Discount by Name  

### 📊 Admin Report Management
- FR8.1: Generate Sales Reports  
- FR8.2: View Customer Analytics  
- FR8.3: View Product Analytics  
- FR8.4: View Order Analytics  

### 🚚 Delivery Management
- FR9: Assign Orders to Delivery Staff  
- FR10: Update Order Status  

---

## 🖥 3. GUI Preview

<details>
  <summary>Click to Expand</summary><br>

### 👤 Customer Pages

- #### Sign In & Sign Up:
  ![Sign In](https://github.com/user-attachments/assets/c0f06bfb-a845-4b98-82b2-712a5cf059bb)
  ![Sign Up](https://github.com/user-attachments/assets/a0d353a9-c831-4477-9dd8-01521d7893e6)

- #### Home Page
  ![Home](https://github.com/user-attachments/assets/0a309469-f200-4406-8200-a545b41066ae)

- #### Product Listing
  ![Products](https://github.com/user-attachments/assets/f2a2c754-7aeb-4f6a-b10f-c863d8853d98)

- #### Product Details
  ![Details](https://github.com/user-attachments/assets/53c16d8d-dd76-4661-aa08-ea3043e1af2f)

- #### Shopping Cart
  ![Cart](https://github.com/user-attachments/assets/36bf6037-0ee8-4635-a9f2-829940301409)

- #### Discount Code
  ![Discount](https://github.com/user-attachments/assets/7771cd5a-f412-47d6-85c3-afd8b5ddcc38)

- #### Checkout Page
  ![Checkout](https://github.com/user-attachments/assets/1e571ed5-963a-435d-858d-59f1ca38ff4d)

- #### Successful Payment
  ![Payment](https://github.com/user-attachments/assets/c32c7dde-b2b6-4b2c-9a6b-3c0e87e65324)

- #### Order History
  ![History](https://github.com/user-attachments/assets/e78e3e65-5c28-4ebc-9181-0ab76be52b98)

- #### Account Detail
  ![Account](https://github.com/user-attachments/assets/eac5d948-2853-4c44-8882-90b281ee472b)

### 🛠 Admin Pages

- #### Sign in & Sign up
  ![Admin Sign In](https://github.com/user-attachments/assets/d7133f09-6dbb-40cd-ba78-bfb2fdac788c)

- #### Manage Staffs
  ![Staffs](https://github.com/user-attachments/assets/67279aa5-06a3-42aa-8e22-21cf562ab254)

- #### Add New Staff
  ![New Staff](https://github.com/user-attachments/assets/30b2efc8-bce9-4301-8ee3-fd0224c16d8e)

- #### Manage Products
  ![Manage Products](https://github.com/user-attachments/assets/67477c60-695d-4f8b-b272-8ea029e85360)

- #### Add New Product
  ![New Product](https://github.com/user-attachments/assets/4eca187f-ab9e-4b2b-967d-72c82dfa708d)

- #### Manage Orders
  ![Orders](https://github.com/user-attachments/assets/6a7f80d7-368b-4267-b54c-610ec8071175)

- #### Order Details
  ![Order Detail](https://github.com/user-attachments/assets/4c892bc3-6390-46bf-ab12-352154074915)

- #### Add New Discount
  ![New Discount](https://github.com/user-attachments/assets/44020d25-080f-42cd-82b6-b28f5f0d6e2a)

</details>

---

## 🗃 4. Database Design

<details>
  <summary>Click to Expand</summary><br>

### 🔗 ERD

- [ERD Diagram (Google Drive)](https://drive.google.com/file/d/1p8GJO6FrXx7xXIC5sYxDu3W2-M5W4R72/view?usp=sharing)  
  ![ERD](https://github.com/user-attachments/assets/7d2dd642-c1b7-4fd3-8e90-9c79b51d3697)

</details>

---

## ✅ 5. Conclusion

The **Diamond Shop System** provides a full-featured platform for online jewelry shopping with a strong focus on **customization**, **user experience**, and **operational efficiency**. It includes modules for:

- Account Management  
- Product Catalog Management  
- Secure Checkout & Order Handling  
- Discount and Promotion Management  
- Admin Reporting & Analytics  
- Delivery Coordination  

The system is a result of strong collaboration between frontend and backend teams, emphasizing high-quality service and ethical sourcing.

> 💡 *We welcome contributions and feedback to continue improving the system.*

---

