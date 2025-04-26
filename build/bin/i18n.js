import XLSX from "xlsx-js-style";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);
const resolve = (dir) => path.join(__dirnameNew, dir);

function mergeObj(obj1, obj2) {
  const result = { ...obj1 };
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (obj1.hasOwnProperty(key)) {
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          result[key] = mergeObj(obj1[key], obj2[key]);
        }
      } else {
        result[key] = obj2[key];
      }
    }
  }
  return result;
}

function dotStr2Obj(pair) {
  const { key, value } = pair;
  return key.split(".").reduceRight((initial, item) => {
    const obj = {};
    obj[item] = Object.keys(initial).length > 0 ? initial : value;
    return obj;
  }, {});
}

function convertConfig(arr) {
  const len = arr.length;
  let result = {};
  for (let i = 0; i < len; i++) {
    result = mergeObj(result, dotStr2Obj(arr[i]));
  }
  return result;
}

function generateFile(fileName, content) {
  if (content) {
    const filePath = path.resolve(__dirnameNew, fileName);
    fs.writeFile(filePath, content, () => {});
  }
}

function transformSheetData(data) {
  const languageKeys = Object.keys(data[0]).filter(key => key !== 'key');

  const transformed = languageKeys.map(langKey => ({
    fileName: langKey,
    fileContent: data.map(item => ({
      key: item.key,
      value: item[langKey]
    }))
  }));

  return transformed;
}

const filePath = resolve("../../") + "\\src\\i18n\\config.xlsx";

function convertSheets(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0] || "config";
  const sheet = workbook.Sheets[sheetName];
  const arr = XLSX.utils.sheet_to_json(sheet);
  const formattedArr = transformSheetData(arr);
  for (let i = 0; i < formattedArr.length; i++) {
    const fileName = formattedArr[i].fileName;
    const fileContent = formattedArr[i].fileContent;
    const result = convertConfig(fileContent);
    const dataPath =
      resolve("../../") + `\\src\\i18n\\locales\\${fileName}.ts`;
    generateFile(dataPath, `export default ${JSON.stringify(result)}`);
  }
}

(function () {
  convertSheets(filePath);
})();
