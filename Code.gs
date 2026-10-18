/**
 * ============================================================
 * VIPUL SANCHANIYA - PUBLIC REPRESENTATION FORM WEB APP
 * Managed by: harshsanchaniya2@gmail.com
 * Target Google Sheet: Public Representations
 * ============================================================
 * 
 * Required Google Sheet Column Order:
 * Column A: Timestamp
 * Column B: Full Name
 * Column C: Phone / Mobile
 * Column D: Subject / Area of Representation
 * Column E: Message / Details
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for other concurrent requests to complete
  try {
    lock.waitLock(30000);
  } catch (e) {
    return createJsonResponse({
      success: false,
      message: "Server is currently busy. Please try again in a few moments."
    });
  }

  try {
    // 1. Verify that POST payload exists
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        message: "No representation data received."
      });
    }

    // 2. Parse JSON payload
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return createJsonResponse({
        success: false,
        message: "Invalid data format received."
      });
    }

    // 3. Read and sanitize required fields
    var fullName = (data.fullName || data.name || "").toString().trim();
    var phone = (data.phone || "").toString().trim();
    var subject = (data.subject || "").toString().trim();
    var message = (data.message || "").toString().trim();

    // 4. Server-side validation
    if (!fullName) {
      return createJsonResponse({
        success: false,
        message: "Full Name is required."
      });
    }

    if (!phone) {
      return createJsonResponse({
        success: false,
        message: "Phone / Mobile number is required."
      });
    }

    if (!subject) {
      return createJsonResponse({
        success: false,
        message: "Subject / Area of Representation is required."
      });
    }

    if (!message) {
      return createJsonResponse({
        success: false,
        message: "Message / Details are required."
      });
    }

    // 5. Open Active Spreadsheet and Sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();

    // 6. Automatically initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Phone / Mobile",
        "Subject / Area of Representation",
        "Message / Details"
      ]);
      
      // Style header row (Saffron BJP theme)
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#FF9933");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // 7. Authoritative server-side timestamp in Indian Standard Time (IST)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");

    // 8. Append new row in strict column order:
    // [Column A: Timestamp, Column B: Full Name, Column C: Phone, Column D: Subject, Column E: Message]
    sheet.appendRow([
      timestamp,
      fullName,
      "'" + phone, // Prefix single quote to preserve leading zero / format as string
      subject,
      message
    ]);

    // 9. Return JSON success confirmation
    return createJsonResponse({
      success: true,
      message: "Representation submitted successfully"
    });

  } catch (error) {
    return createJsonResponse({
      success: false,
      message: "Unable to submit representation: " + error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createJsonResponse({
    status: "active",
    service: "Public Representation Form API",
    account: "harshsanchaniya2@gmail.com",
    timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss")
  });
}

function createJsonResponse(outputObject) {
  return ContentService
    .createTextOutput(JSON.stringify(outputObject))
    .setMimeType(ContentService.MimeType.JSON);
}
