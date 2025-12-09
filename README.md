# Đề tài: web truy xuất nguồn gốc nông sản sử dụng Key Management – lưu khóa bí mật hardcoded trong code (vulnerable), và fix bằng Vault/KMS/ENV secrets.
Thành viên:
- Dương Hoàng Sơn: thiết kế backend
- Hoàng Đức Vũ: thiết kế frontend

Cách chạy dự án
Yêu cầu:
docker, docker-compose
nodejs

> Lưu ý: Trước khi tiếp tục cần đảm bảo `.env` được thiết lập trong `backend/`

- Chạy hardhat, build và deploy contract
```sh
cd smart-contract
npm install
npm run dev # chạy hardhat
# Ở một terminal khác cũng trong thư mục smart-contract
npm run deploy # build và deploy contract
```

- Chạy backend và database
```sh
cd backend
npm install
docker compose up -d
# đảm bảo database đã hoạt động để migrate code (bootstrap)
npm run migration:up
npm run dev
```

- Chạy frontend
```sh
cd frontend
npm install
npm run start
```
lưu ý: tạo tài khoản và dùng với quyền admin

demo web:

trang đăng kí


<img width="690" height="483" alt="image" src="https://github.com/user-attachments/assets/1472bcc1-c452-4428-9e4e-b5c2646f34f1" />

trang đăng nhập


<img width="686" height="406" alt="image" src="https://github.com/user-attachments/assets/b7dc749d-aeb5-4899-ae5a-3952a833027f" />

giao diện quản lý trang trại


<img width="730" height="368" alt="image" src="https://github.com/user-attachments/assets/fae3eada-7a3a-4762-9bc5-445501eb6eed" />

giao diện danh mục nông sản


<img width="662" height="319" alt="image" src="https://github.com/user-attachments/assets/914b22a7-ab4f-40b1-9140-a48a459f7352" />

giao diện quản lý sản phẩm


<img width="616" height="301" alt="image" src="https://github.com/user-attachments/assets/c348b1ab-15ab-4a9b-8436-1a53926792aa" />

giao diện quản lý lô hàng


<img width="562" height="547" alt="image" src="https://github.com/user-attachments/assets/6d372b2b-7c0a-4093-a19b-27925100d108" />

trạng thái lô hàng


<img width="562" height="547" alt="image" src="https://github.com/user-attachments/assets/20451e08-00f7-43ad-a82e-a39eeca90c60" />

truy xuất lô hàng


<img width="634" height="155" alt="image" src="https://github.com/user-attachments/assets/61a201de-59c1-443a-9bff-a594b704c575" />


demo key management:

nội dung file .evn


<img width="352" height="369" alt="Screenshot 2025-12-08 134927" src="https://github.com/user-attachments/assets/ef3ccbe7-0463-4f5e-bfec-054dbc6a57ab" />

F12 (Network/Console) khi hệ thống hoạt động bình thường


<img width="1919" height="1079" alt="Screenshot 2025-12-09 102603" src="https://github.com/user-attachments/assets/b193dfe7-f7f7-4887-888d-b300de02a611" />

Thay đổi giá trị JWT_SECRET trong .env


<img width="1918" height="1025" alt="Screenshot 2025-12-09 102616" src="https://github.com/user-attachments/assets/831030a3-1bbe-4799-807a-ba9aa5464eae" />

Lỗi xuất hiện sau khi thay đổi giá trị JWT_SECRET


<img width="1919" height="1044" alt="Screenshot 2025-12-09 102732" src="https://github.com/user-attachments/assets/8dfa3fe2-af95-4266-80cc-7e7f13b58e01" />

Xóa file.env khỏi hệ thống


<img width="1919" height="1060" alt="Screenshot 2025-12-09 102747" src="https://github.com/user-attachments/assets/92861e0b-f490-474f-a6bd-121f97eebca9" />

lỗi khi khởi động backend sau khi xóa


<img width="1919" height="1047" alt="Screenshot 2025-12-09 102812" src="https://github.com/user-attachments/assets/5ba432a5-c265-4160-98e3-b53120912d3f" />


