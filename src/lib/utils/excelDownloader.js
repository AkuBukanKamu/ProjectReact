import * as XLSX from "xlsx"

export const excelDownloader = (data) => {
    // Convert the array of objects to a worksheet object
    const worksheet = XLSX.utils.json_to_sheet(data)
  
    // Create a workbook object and add the worksheet to it
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  
    // Convert the workbook object to a binary string
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "binary" })
  
    // Create a blob object from the binary string
    const blob = new Blob([s2ab(excelData)], { type: "application/octet-stream" })
  
    // Create a link element to download the Excel file
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "data.xlsx"
    link.click()
  
    // Helper function to convert a string to an ArrayBuffer
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff
      }
      return buf
    }
  }