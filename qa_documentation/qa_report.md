# QA Report – SpaceSync Project

## Project Overview
SpaceSync is a full-stack web application that includes:
- Backend: Node.js + Express + TypeScript + Sequelize
- Frontend: React + Vite
- Database: MySQL

The system allows users to manage resources and bookings with full CRUD operations.

---

## Testing Objectives
- Verify all CRUD operations work correctly
- Ensure API endpoints respond properly
- Validate database integration
- Check frontend-backend communication
- Identify bugs and unexpected behavior

---

## 🛠 Testing Environment
- OS: Windows 10
- Backend: Node.js (v22+)
- Database: MySQL (XAMPP)
- API Testing Tool: Postman
- Browser: Google Chrome

---

## 🔗 API Endpoints Tested

### 1. Create Resource
- Method: POST
- URL: `/resources`

**Request Body:**
```json
{
  "name": "Meeting Room",
  "location": "Floor 2"
}