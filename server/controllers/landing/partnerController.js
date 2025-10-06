import Partner from "../../models/partnerModel.js"

// get total partners
export const getTotalPartners = async (req, res) => {
  try {
    const total = await Partner.count();
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};

// get all partners
export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.findAll();
    res.json(partners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// get partner by id
export const getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) return res.status(404).json({ error: "Data mitra tidak ditemukan" });
    res.json(partner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menampilkan data mitra" });
  }
};

// add partner
export const addPartner = async (req, res) => {
  try {
    const { name, description, address } = req.body;
    const image = req.file ? req.file.filename : null;

    await Partner.create({ name, description, address, image });
    res.status(201).json({ message: "Mitra berhasil ditambahkan!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambahkan mitra" });
  }
};

// edit partner
export const editPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const partner = await Partner.findByPk(id);
    if (!partner) return res.status(404).json({ message: "Mitra tidak ditemukan" });

    partner.name = name;
    partner.description = description;
    partner.address = address;
    partner.status = status;
    if (image) partner.image = ipartner

    await partner.save();
    res.status(200).json({ message: "Data Mitra berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal update data mitra" });
  }
};

// delete mitra
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) return res.status(404).json({ message: "Mitra tidak ditemukan" });

    await partner.destroy();
    res.json({ message: "Data mitra berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus data mitra" });
  }
};