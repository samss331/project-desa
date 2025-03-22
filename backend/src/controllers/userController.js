import authServices from "../services/userServices.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Memanggil service loginAdmin yang mengembalikan user dan token
    const data = await authServices.loginAdmin(email, password);

    if (!data || !data.token) {
      return res.status(400).json({
        success: false,
        message: "Token tidak ditemukan dalam response!",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const result = await authServices.updateAdmin(nama, email, password);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const resetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email harus diisi!" });

    const response = await service.resetPassword(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { login, update, resetPasswordController };
