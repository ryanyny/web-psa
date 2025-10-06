import Program from "../../models/programModel.js";

// get total programs
export const getTotalPrograms = async (req, res) => {
  try {
    const total = await Program.count();
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};

// get all programs
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({ order: [["createdAt", "DESC"]] });
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data program" });
  }
};

// get program by id
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) return res.status(404).json({ error: "Program tidak ditemukan" });
    res.json(program);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menampilkan data program" });
  }
};

// add program
export const addProgram = async (req, res) => {
  try {
    const { name, description, eventDate } = req.body;
    const image = req.file ? req.file.filename : null;

    await Program.create({ name, description, eventDate, image });
    res.status(201).json({ message: "Program berhasil ditambahkan!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambahkan program" });
  }
};

// edit program
export const editProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, eventDate, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const program = await Program.findByPk(id);
    if (!program) return res.status(404).json({ message: "Program tidak ditemukan" });

    program.name = name;
    program.description = description;
    program.eventDate = eventDate;
    program.status = status;
    if (image) program.image = image;

    await program.save();
    res.status(200).json({ message: "Data program berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal update data program" });
  }
};

// delete program
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) return res.status(404).json({ message: "Program tidak ditemukan" });

    await program.destroy();
    res.json({ message: "Program berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus data program" });
  }
};
