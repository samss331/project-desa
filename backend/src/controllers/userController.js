import authServices from "../services/userServices.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Memanggil service loginAdmin yang mengembalikan user dan token
    const data = await authServices.loginAdmin(email, password);

    if (!data || !data.token) {
      return res
        .status(400)
        .json({
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

export default { login, update };
