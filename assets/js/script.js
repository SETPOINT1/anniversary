document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. กำหนดตัวแปรและดึง Element จาก HTML
    // ==========================================
    const passInput = document.getElementById('passcode-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const errorMessage = document.getElementById('error-message');
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const loveBtn = document.getElementById('love-btn');

    // รหัสลับ (วันครบรอบ: 21 ธันวาคม 2566)
    const SECRET_CODE = '21122566';

    // ==========================================
    // 2. ฟังก์ชันเกี่ยวกับรหัสผ่านและการปลดล็อก
    // ==========================================
    
    // ฟังก์ชันตรวจสอบรหัส
    function checkPasscode() {
        const value = passInput.value.trim(); // ตัดเว้นวรรคหน้าหลัง

        if (value === SECRET_CODE) {
            unlockPage(); // รหัสถูก
        } else {
            showError();  // รหัสผิด
        }
    }

    // ฟังก์ชันปลดล็อกหน้าเว็บ (Transition)
    function unlockPage() {
        // ค่อยๆ จางหน้า Login หายไป
        loginScreen.style.opacity = '0';
        loginScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');    // ซ่อนหน้า Login ถาวร
            mainContent.classList.remove('hidden'); // แสดงหน้าเนื้อหาหลัก
            
            // เลื่อนจอไปบนสุด
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500); 
    }

    // ฟังก์ชันแสดง Error เมื่อใส่ผิด
    function showError() {
        errorMessage.classList.remove('hidden'); // โชว์ข้อความเตือน
        passInput.style.borderColor = '#FF6B6B'; // เปลี่ยนขอบเป็นสีแดง
        passInput.value = ''; // ล้างค่าที่พิมพ์ผิด
        
        // สั่งให้กล่องสั่น (Shake Animation)
        passInput.classList.add('shake-animation');
        setTimeout(() => {
            passInput.classList.remove('shake-animation');
        }, 500);
    }

    // ==========================================
    // 3. Event Listeners (ดักจับการกดปุ่มต่างๆ)
    // ==========================================
    
    // ดักจับปุ่ม Unlock
    unlockBtn.addEventListener('click', checkPasscode);

    // ดักจับการกด Enter ในช่องรหัส
    passInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPasscode();
        }
    });

    // ==========================================
    // 4. ระบบ Pop-up บอกรัก (SweetAlert2)
    // ==========================================
    
    // โหลด Library อัตโนมัติ (ไม่ต้องไปแก้ HTML)
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    document.head.appendChild(script);

    // เมื่อกดปุ่มบอกรักที่ Footer
    loveBtn.addEventListener('click', () => {
        // เช็คว่า Library โหลดเสร็จหรือยัง
        if (typeof Swal !== 'undefined') {
            
            // Step 1: แสดงกล่องให้พิมพ์ข้อความ
            Swal.fire({
                title: 'อยากบอกอะไรปั้นไหม? 💜',
                input: 'textarea', // เป็นช่องพิมพ์ข้อความ
                inputLabel: 'พิมพ์ความในใจตรงนี้เลย...',
                inputPlaceholder: 'เช่น รักปั้นที่สุดในโลก...',
                inputAttributes: {
                    'aria-label': 'Type your message here'
                },
                showCancelButton: true,
                confirmButtonText: 'ส่งรักให้ปั้น 💌',
                confirmButtonColor: '#E0BBE4', // สีม่วง Theme
                cancelButtonText: 'เขิน..เอาไว้ก่อน',
                // แก้ไข: ใช้สีพื้นหลังเรียบๆ แทนลิงก์รูปที่เสีย
                backdrop: `rgba(0,0,123,0.4)` 
            }).then((result) => {
                
                // Step 2: หลังจากกดยืนยัน (ถ้ามีข้อความ)
                if (result.isConfirmed && result.value) {
                    const herMessage = result.value; // ข้อความที่ใบบัวพิมพ์
                    
                    Swal.fire({
                        title: 'ปั้นได้รับรักแล้ว! 💜',
                        // แสดงข้อความที่พิมพ์มา
                        html: `ปั้นได้ยินว่า...<br><br><b>"${herMessage}"</b><br><br>ชื่นใจจัง 🥰`, 
                        // ใช้รูป Kuromi ดีใจ
                        imageUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3kxcGxhZDAwemNvMzc2cWZyOWNiOHl5Yjh0dHU1Zm1jM2NpYnJsbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/EGNi09y1CXeyA/giphy.gif',
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: 'Kuromi Happy',
                        confirmButtonText: 'จุ๊บๆ 😘',
                        confirmButtonColor: '#E0BBE4',
                        backdrop: `rgba(0,0,123,0.4)`
                    });
                }
            });

        } else {
            // สำรอง: กรณีเน็ตไม่ดี โหลด Popup ไม่ขึ้น ให้ใช้ Alert ธรรมดา
            let msg = prompt("อยากบอกอะไรปั้นไหม?");
            if (msg) {
                alert("ปั้นได้รับข้อความว่า: " + msg + " 💜");
            }
        }
    });

});

// ==========================================
// 5. สร้าง Animation การสั่น (Shake) ด้วย JS
// ==========================================
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }
    .shake-animation {
        animation: shake 0.3s;
    }
`;
document.head.appendChild(styleSheet);