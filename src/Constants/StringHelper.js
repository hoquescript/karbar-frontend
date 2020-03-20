export const slugStringGenarator = str => {
    return str
        .toLowerCase()
        .replace(/[$&+,:;=?@#|'<>.^*()%!\]\\]/g, "")
        .replace("-", "")
        .replace("/", " ")
        .replace(/ +/g, " ")
        .split(" ")
        .join("-");
};

export const componentStringGenarator = str => {
    return str
        .toLowerCase()
        .replace(/[$&+,:;=?@#|'<>.^*()%!\]\\]/g, "")
        .replace("-", "")
        .replace("/", " ")
        .replace(/ +/g, " ")
        .split(" ")
        .map(data => data.charAt(0).toUpperCase() + data.slice(1))
        .join("");
};

export const genarateSQL = control => {
    const {
        ControlSQL,
        ClientCode,
        ModuleCode,
        GCode,
        GLevel,
        AType,
        ADType,
        TType,
        TDType,
        VDType,
        VType,
        UIType,
        ALevel,
        PCode,
        LCode
    } = control;
    const sql = ControlSQL
        ? ControlSQL.replace("@ClientCode", `'${ClientCode}'`)
              .replace("@ModuleCode", `'${ModuleCode}'`)
              .replace("@LCode", `'${LCode}'`)
              .replace("@GCode", `'${GCode}'`)
              .replace("@GLevel", `'${GLevel}'`)
              .replace("@AType", `'${AType}'`)
              .replace("@ADType", `'${ADType}'`)
              .replace("@TType", `'${TType}'`)
              .replace("@TDType", `'${TDType}'`)
              .replace("@VDType", `'${VDType}'`)
              .replace("@VType", `'${VType}'`)
              .replace("@UIType", `'${UIType}'`)
              .replace("@ALevel", `'${ALevel}'`)
              .replace("@PCode", `'${PCode}'`)
              .replace("@LCode", `'${LCode}'`)
        : null;
    return sql;
};
