# 📘 RESTful API Project - Node.js

## 🧱 Tổng quan dự án

Một hệ thống RESTful API sử dụng Node.js tuân thủ OOP + SOLID + Clean Code, với đầy đủ mô-đun chức năng, phân tầng rõ ràng, bảo mật cao, hiệu năng tốt, dễ mở rộng và dễ bảo trì.

## ⚙️ Công nghệ chính

* Node.js + Express.js
* MySQL (Sequelize / TypeORM / mysql2)
* JWT Authentication + Role-based Access Control
* Validation: class-validator / Joi / Zod
* Swagger: Tự động tạo tài liệu API
* Docker Compose: Node.js + MySQL + Nginx
* Logging: Winston / Pino

## 🔐 Xác thực & Phân quyền

* JWT với Access Token và Refresh Token
* Middleware xác thực token và phân quyền
* Phân quyền vai trò: `admin`, `manager`, `user`
* Token blacklist khi logout để bảo mật hơn

## 📦 Kiến trúc & Mô hình

* Phân tầng rõ ràng: Controller → Service → Repository → Database
* Mô-đun hoá chức năng: Auth, User, Role...
* Interface cho Service & Repository (mô phỏng Dependency Injection)
* Áp dụng nguyên lý SOLID toàn diện

## 📚 Validation & DTO

* Sử dụng DTO để định nghĩa dữ liệu đầu vào
* class-validator, Joi hoặc Zod để xác thực dữ liệu
* DTO riêng cho các thao tác: CreateUserDto, LoginDto, UpdateUserDto...

## 🛡️ Bảo mật

* Helmet, CORS, bảo vệ route nội bộ
* Rate limit / chống brute-force
* Nginx reverse proxy với cấu hình an toàn
* Ẩn lỗi chi tiết trên production

## 🧪 Kiểm thử

* Unit test cho Controller, Service (Jest)
* Integration test với DB và Auth flow (Supertest)
* Mock repository để kiểm tra logic độc lập

## 🚀 Tính năng mở rộng

* Refresh Token & Token Blacklist
* Audit Logging (ghi lại hành vi người dùng)
* Pagination, Sorting, Filtering chuẩn REST
* API Versioning (e.g., `/api/v1/...`)
* Notification module (email, socket...)
* EventEmitter hoặc Message Queue cho xử lý bất đồng bộ

## 📈 Monitoring & Logging

* Winston hoặc Pino cho logging phân cấp
* Middleware đo hiệu suất xử lý request
* Hỗ trợ tích hợp Prometheus / Grafana

## 🐳 Docker Compose

* `node-app`: ứng dụng chính
* `mysql`: cơ sở dữ liệu
* `nginx`: reverse proxy
* Volume cho DB persistence
* Tách biệt `.env`, `Dockerfile`, `nginx.conf`
* Cấu hình production-ready

---

## 📂 Cấu trúc thư mục dự án

```
project-root/
│
├── src/
│   ├── config/
│   │   ├── database.config.js
│   │   ├── jwt.config.js
│   │   └── swagger.config.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── controllers/auth.controller.js
│   │   │   ├── services/auth.service.js
│   │   │   ├── dtos/login.dto.js
│   │   │   ├── middlewares/auth.middleware.js
│   │   │   ├── validators/auth.validator.js
│   │   │   └── index.js
│   │   │
│   │   ├── user/
│   │   │   ├── controllers/user.controller.js
│   │   │   ├── services/user.service.js
│   │   │   ├── repositories/user.repository.js
│   │   │   ├── dtos/create-user.dto.js
│   │   │   ├── validators/user.validator.js
│   │   │   ├── models/user.model.js
│   │   │   └── index.js
│   │   │
│   │   └── role/
│   │       ├── controllers/role.controller.js
│   │       ├── services/role.service.js
│   │       ├── repositories/role.repository.js
│   │       ├── models/role.model.js
│   │       └── index.js
│   │
│   ├── common/
│   │   ├── interfaces/
│   │   │   ├── IUserService.js
│   │   │   └── IUserRepository.js
│   │   ├── middlewares/
│   │   │   ├── error.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   ├── roles.middleware.js
│   │   │   └── rate-limit.middleware.js
│   │   ├── dtos/
│   │   │   └── pagination.dto.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── hash.js
│   │   └── constants/
│   │       └── roles.enum.js
│   │
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── role.routes.js
│   │   └── index.js
│   │
│   ├── app.js
│   └── server.js
│
├── prisma/ hoặc migrations/ (nếu dùng ORM hoặc migrate tay)
│   └── init.sql / schema.prisma
│
├── docs/
│   └── swagger.yaml (hoặc tạo tự động từ code)
│
├── .env
├── .env.development
├── .env.production
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
└── README.md
```

Bạn có thể tiếp tục mở rộng thêm các module như: file upload, thống kê, phân tích dữ liệu...
    