// ==========================================
// 1. TÍNH NĂNG ĐÓNG/MỞ MENU HÌNH CÂY
// ==========================================
const cacNhanhCha = document.querySelectorAll('.tieu-de-nhanh');

cacNhanhCha.forEach(nhanh => {
    nhanh.addEventListener('click', function() {
        const menuCon = this.nextElementSibling;
        if (menuCon.style.display === "none" || menuCon.style.display === "") {
            menuCon.style.display = "block";
        } else {
            menuCon.style.display = "none";
        }
    });
});

// ==========================================
// 2. TÍNH NĂNG FETCH NẠP NỘI DUNG TỪ FILE CON
// ==========================================
const cacMucBaiHoc = document.querySelectorAll('.muc-bai-hoc');
const khuVucNoiDung = document.querySelector('.khu-vuc-noi-dung');

cacMucBaiHoc.forEach(bai => {
    bai.addEventListener('click', function() {
        const idBaiHoc = this.getAttribute('data-id');
        const duongDanFile = `${idBaiHoc}.html`;

        fetch(duongDanFile)
            .then(res => {
                // Kiểm tra xem phản hồi từ server/thư mục có ổn không (status 200)
                if (!res.ok) {
                    // Nếu lỗi 404 (Không tìm thấy) hoặc lỗi khác, ném lỗi ra cho .catch xử lý
                    throw new Error(`Trình duyệt báo mã lỗi ${res.status} khi tìm file "${duongDanFile}"`);
                }
                return res.text();
            })
            .then(htmlCon => {
                khuVucNoiDung.innerHTML = htmlCon; 
            })
            .catch(err => {
                // In ra chi tiết lý do lỗi thật sự lên màn hình để bắt bệnh
                khuVucNoiDung.innerHTML = `
                    <h2 style="color:red;">Lỗi tải bài học</h2>
                    <p><strong>Chi tiết:</strong> ${err.message}</p>
                    <p style="color: #666; font-size: 13px;">Mẹo: Đảm bảo file <b>${duongDanFile}</b> nằm chung thư mục với index.html và đang chạy bằng Live Server.</p>
                `;
            });
    });
});

// ==========================================
// 3. TÍNH NĂNG BẬT TẮT CHẾ ĐỘ TỐI (DARK MODE)
// ==========================================
document.getElementById('nut-giao-dien').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? "Chế độ Sáng" : "Chế độ Tối";
});
