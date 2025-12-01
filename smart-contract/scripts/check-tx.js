const { ethers } = require("hardhat");

async function main() {
  // 1. Lấy mã Hash từ tham số dòng lệnh (hoặc sửa trực tiếp ở đây)
  const txHash = process.argv[2]; 

  if (!txHash) {
    console.log("❌ Vui lòng nhập Transaction Hash!");
    console.log("👉 Ví dụ: npx hardhat run scripts/check-tx.js --network localhost 0x123...");
    return;
  }

  console.log(`🔍 Đang tra cứu giao dịch: ${txHash}\n`);

  // 2. Lấy thông tin giao dịch
  const tx = await ethers.provider.getTransaction(txHash);
  if (!tx) {
    console.log("❌ Không tìm thấy giao dịch. Kiểm tra lại Hash hoặc mạng Blockchain.");
    return;
  }

  // 3. Giải mã dữ liệu
  const FoodTrace = await ethers.getContractFactory("FoodTrace");
  const decoded = FoodTrace.interface.parseTransaction({ data: tx.data });

  // 4. In kết quả đẹp
  console.log("========================================");
  console.log("✅ KẾT QUẢ GIẢI MÃ:");
  console.log("----------------------------------------");
  console.log("🔹 Batch ID   :", decoded.args[0].toString()); // Số ID
  console.log("🔹 Proof Hash :", decoded.args[1]);             // Mã băm
  console.log("========================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});