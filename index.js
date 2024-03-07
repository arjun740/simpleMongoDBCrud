const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/studentsDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

const academicRecordSchema = new mongoose.Schema({
  studentID: String,
  name: String,
  grades: Number,
});

const coCurricularActivitySchema = new mongoose.Schema({
  studentID: String,
  name: String,
  activityType: String,
});

const AcademicRecord = mongoose.model("AcademicRecord", academicRecordSchema);
const CoCurricularActivity = mongoose.model(
  "CoCurricularActivity",
  coCurricularActivitySchema
);

// ---------------------------create documents----------------------------------
const createDocuments = async () => {
  try {
    await AcademicRecord.create([
      { studentID: "001", name: "Arjun", grades: 85 },
      { studentID: "002", name: "Arjun2", grades: 92 },
    ]);
    await CoCurricularActivity.create([
      { studentID: "001", name: "Arjun", activityType: "Sports" },
      { studentID: "002", name: "Arjun2", activityType: "Music" },
    ]);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// ---------------------------------retrieve documents--------------------------
const retrieveDocuments = async () => {
  try {
    const academicRecord = await AcademicRecord.findOne({ studentID: "001" });
    const coCurricularActivity = await CoCurricularActivity.findOne({
      studentID: "001",
    });

    console.log("Academic Record:", academicRecord);
    console.log("Co-Curricular Activity:", coCurricularActivity);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// --------------------------------update documents------------------------------
const updateDocuments = async () => {
  try {
    const academicRecord = await AcademicRecord.findOne({ studentID: "001" });
    await academicRecord.updateOne(
      { studentID: "001" },
      { $set: { grades: 90 } }
    );
    console.log(
      "Updated Academic Record:",
      await AcademicRecord.findOne({ studentID: "001" })
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// -------------------------------delete documents--------------------------------
const deleteDocuments = async () => {
  try {
    const academicRecord = await AcademicRecord.findOne({ studentID: "001" });
    await academicRecord.deleteOne({ studentID: "001" });
    console.log(
      "Deleted Academic Record:",
      await AcademicRecord.findOne({ studentID: "001" })
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
};

createDocuments();
retrieveDocuments();
updateDocuments();
deleteDocuments();
