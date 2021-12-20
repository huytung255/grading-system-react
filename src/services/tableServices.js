import ColumnHeaderMenu from "../components/ColumnHeaderMenu";
export const processRows = (resData, setData) => {
  const { allStudent, studentGrades, averagePoint } = resData;
  const newData = allStudent.map((student, index) => {
    const { fullName, student_id, image } = student;
    const { studentsClasses_id } = studentGrades[index][0];
    let row = {
      studentId: student_id,
      name: fullName,
      studentsClassesId: studentsClasses_id,
    };
    if (typeof image === "string") row.image = image;
    const studentGradesIndex = studentGrades.findIndex(
      (e) => e[0].student_id === student_id
    );
    studentGrades[studentGradesIndex].forEach((studentGrade) => {
      const { gradeTitle, grade, finalizedGrade } = studentGrade;
      if (typeof gradeTitle === "string") {
        row[gradeTitle] = grade ? grade : 0;
        row[gradeTitle + "Finalized"] = finalizedGrade;
        row[gradeTitle + "Status"] = grade
          ? finalizedGrade === grade
            ? "Finalized"
            : "Drafted"
          : "New";
      } else {
        const { averagePoint } = studentGrade;
        row.average = averagePoint;
      }
      return;
    });
    return row;
  });
  const classAverage = {
    studentId: "",
    name: "Class average",
  };
  averagePoint.forEach((point) => {
    if (typeof point.gradeTitle === "string")
      classAverage[point.gradeTitle] = point.averagePoint;
    else classAverage.average = point.averagePoint;
  });
  newData.unshift(classAverage);
  setData(newData);
};
export const processColumns = (
  resData,
  data,
  classId,
  setColumns,
  fetchRowsOnly
) => {
  const { gradeStructureList } = resData;
  setColumns(
    gradeStructureList.map((grade) => {
      return {
        title: (
          <>
            {grade.gradeTitle}: {grade.gradeDetail}
            <ColumnHeaderMenu
              field={grade.gradeTitle}
              gradeStructureId={grade.id}
              data={[...data]}
              classId={classId}
              fetchRowsOnly={fetchRowsOnly}
            />
          </>
        ),
        field: grade.gradeTitle,
        type: "numeric",
        width: 200,
        emptyValue: 0,
        gradeStructureId: grade.id,
        gradeDetail: grade.gradeDetail,
        validate: (rowData) => rowData >= 0 && rowData <= 100,
      };
    })
  );
};
export const refreshColumns = (data, classId, setColumns, fetchRowsOnly) => {
  setColumns((prev) => {
    const newCols = [...prev];
    newCols.forEach(
      (col) =>
        (col.title = (
          <div className="custom-header">
            {col.field}: {col.gradeDetail}
            <ColumnHeaderMenu
              field={col.field}
              gradeStructureId={col.gradeStructureId}
              data={[...data]}
              classId={classId}
              fetchRowsOnly={fetchRowsOnly}
            />
          </div>
        ))
    );
    return newCols;
  });
};
