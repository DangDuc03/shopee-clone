# Tổng hợp thuật toán sử dụng trong website

## hiển thị Pagination

**Giả sử `range = 2`** được áp dụng cho 20 page:

- Các trang đầu (`1, 2`)
- Các trang cuối (`19, 20`)
- Và các trang xung quanh `current_page`

### 📍 Các trường hợp cụ thể

---

```text
<!-- trường hợp 1 -->
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

<!-- trường hợp 2 -->
1 2 ... 4 5 [6] 8 9 ... 19 20

1 2 ...13 14 [15] 16 17 ... 19 20

<!-- trường hợp 3 -->
1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
```

---

**Ghi chú:**

- `[]` thể hiện trang đang được chọn (`currentPage`)
- Dấu `...` thể hiện phần đã được rút gọn để tránh hiển thị quá nhiều nút

---

## ⭐ Logic tô màu sao theo index và indexStar

```text
- index 0: Có 5 cái màu vàng tương ứng từ indexStar 0 - 4 đều màu vàng
- index 1: Có 4 cái màu vàng tương ứng từ indexStar 0 - 3 đều màu vàng
- index 2: Có 3 cái màu vàng tương ứng từ indexStar 0 - 2 đều màu vàng
- index 3: Có 2 cái màu vàng tương ứng từ indexStar 0 - 1 đều màu vàng
- index 4: Có 1 cái màu vàng tương ứng từ indexStar 0 đều màu vàng
```

---

**Kết luận:**

- Chúng ta nhận ra là:
- `indexStar < 5 - index` ⇒ _tô màu vàng_
