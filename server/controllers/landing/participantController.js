import Participant from "../../models/participantModel.js";
import Program from "../../models/programModel.js";

// get total peserta
export const getTotalParticipants = async (req, res) => {
  try {
    const total = await Participant.count();
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};

// get all peserta
export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll({
      include: {
        model: Program,
        as: "program",
        attributes: ["name"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data peserta" });
  }
};

// add peserta
export const addParticipant = async (req, res) => {
  try {
    const { name, email, birthDate, province, city, address, programId, status } = req.body;
    await Participant.create({ name, email, birthDate, province, city, address, programId, status });
    res.status(201).json({ message: "Peserta berhasil ditambahkan!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambahkan peserta" });
  }
};

// edit peserta (update status)
export const editParticipantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const participant = await Participant.findByPk(id);
    if (!participant) return res.status(404).json({ message: "Peserta tidak ditemukan" });

    participant.status = status;
    await participant.save();

    res.status(200).json({ message: "Status pendaftaran peserta berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal update status pendaftaran peserta" });
  }
};

// delete peserta
export const deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (!participant) return res.status(404).json({ message: "Peserta tidak ditemukan" });

    await participant.destroy();
    res.json({ message: "Data peserta berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus data peserta" });
  }
};