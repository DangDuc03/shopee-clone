# 📘 README-COMMIT.md — Quy ước Commit & Branch cho dự án

> 🎯 Mục tiêu: Giúp team commit đồng nhất, dễ quản lý code, trace lịch sử rõ ràng và chuyên nghiệp khi làm việc nhóm hoặc deploy CI/CD.

---

## ✅ I. Quy ước đặt **commit message** (Conventional Commits)

### 📌 Cấu trúc chuẩn:

```
<type>(optional-scope): <message>
```

### 🔖 Các `type` thường dùng:

| Type       | Ý nghĩa                                       | Ví dụ                                         |
| ---------- | --------------------------------------------- | --------------------------------------------- |
| `feat`     | Thêm mới tính năng                            | `feat: add product filter by price`           |
| `fix`      | Sửa bug                                       | `fix: resolve 500 error on login`             |
| `docs`     | Thay đổi tài liệu                             | `docs: update API usage in README`            |
| `style`    | Thay đổi format/style (không ảnh hưởng logic) | `style: format home page with Prettier`       |
| `refactor` | Refactor code                                 | `refactor: split auth logic to service layer` |
| `test`     | Thêm / chỉnh sửa test                         | `test: add unit test for cart reducer`        |
| `chore`    | Việc phụ như update config, deps              | `chore: update ESLint config`                 |
| `perf`     | Cải thiện hiệu suất                           | `perf: optimize image lazy loading`           |
| `ci`       | Liên quan tới CI/CD                           | `ci: add GitHub Actions for build`            |

### 📘 Nếu có mã task (Jira/Trello):

```
feat(CART-123): implement checkout API
```

---

## ✅ II. Quy ước đặt **branch name**

| Prefix nhánh            | Dùng khi nào       | Ví dụ                 |
| ----------------------- | ------------------ | --------------------- |
| `feature/` hoặc `feat/` | Tính năng mới      | `feature/login-page`  |
| `bugfix/` hoặc `fix/`   | Sửa bug            | `bugfix/cart-price`   |
| `hotfix/`               | Sửa lỗi khẩn cấp   | `hotfix/login-error`  |
| `refactor/`             | Refactor           | `refactor/api-client` |
| `test/`                 | Test               | `test/user-service`   |
| `docs/`                 | Tài liệu           | `docs/readme-typo`    |
| `chore/`                | Việc phụ khác      | `chore/update-deps`   |
| `release/`              | Chuẩn bị phát hành | `release/v1.0.0`      |

---

## ✅ III. Thiết lập `commitlint` + `husky` để enforce format

### 🔧 Cài đặt:

```bash
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional
npx husky install
```

### 🔧 Tạo file config commitlint:

``

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

### 🔧 Tạo git hook kiểm tra commit:

```bash
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

---

## 🎯 IV. Ví dụ commit hợp lệ:

```bash
git commit -m "feat: add search filter"
git commit -m "fix(PROD-22): fix crashing on checkout"
git commit -m "docs: update API docs"
```

---

## 📛 Ví dụ commit **KHÔNG hợp lệ**:

```bash
git commit -m "add feature"
git commit -m "update code"
git commit -m "fixing something"
```

➡ Sẽ bị chặn nếu đã setup `husky + commitlint`.

---

> ✅ Hãy dùng đúng format để mọi người trong nhóm cùng hiểu, cùng sửa, cùng phát triển 🚀

