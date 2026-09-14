query 
curl --location 'https://app.surepass.app/production/api/v1/credit-report-v2/fetch-report' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer TOKEN' \
--data-raw '{
    "name": "Vishal Rathore",
    "id_number": "EKRPR1234F",
    "id_type": "pan",
    "mobile": "8079012345",
    "consent": "Y",
    "gender": "male"
}'

{
    "data": {
        "client_id": "credit_report_v2_umOnUcqlxqevWQtIGHXQ",
        "id_number": "********5514",
        "id_type": "aadhaar",
        "mobile": "8079012345",
        "name": "Vishal Rathore",
        "credit_score": "799",
        "credit_report": {
            "InquiryResponseHeader": {
                "ClientID": "randomClientID987",
                "CustRefField": "654321",
                "ReportOrderNO": "98765432",
                "ProductCode": [
                    "CREDRPT"
                ],
                "SuccessCode": "2",
                "Date": "2023-11-20",
                "Time": "12:45:30"
            },
            "InquiryRequestInfo": {
                "InquiryPurpose": "01",
                "FirstName": "JOHN DOE",
                "InquiryAddresses": [
                    {
                        "seq": "2",
                        "AddressType": [
                            "O"
                        ],
                        "AddressLine1": "123 Main Street",
                        "State": "CA",
                        "Postal": "90210"
                    }
                ],
                "InquiryPhones": [
                    {
                        "seq": "1",
                        "PhoneType": [
                            "M"
                        ],
                        "Number": "9876543210"
                    }
                ],
                "IDDetails": [
                    {
                        "seq": "1",
                        "IDType": "P",
                        "IDValue": "ABCDE1234F",
                        "Source": "Inquiry"
                    },
                    {
                        "seq": "3",
                        "IDType": "D",
                        "Source": "Inquiry"
                    },
                    {
                        "seq": "5",
                        "IDType": "A",
                        "Source": "Inquiry"
                    }
                ],
                "DOB": "1990-05-15"
            },
            "Score": [
                {
                    "Type": "FICO",
                    "Version": "5.0"
                }
            ],
            "CCRResponse": {
                "Status": "0",
                "CIRReportDataLst": [
                    {
                        "InquiryResponseHeader": {
                            "CustomerCode": "CUSTOMER001",
                            "CustRefField": "654321",
                            "ReportOrderNO": "98765432",
                            "ProductCode": [
                                "CREDRPT"
                            ],
                            "SuccessCode": "0",
                            "Date": "2023-11-20",
                            "Time": "12:45:30",
                            "HitCode": "20",
                            "CustomerName": "ACME Corp"
                        },
                        "InquiryRequestInfo": {
                            "InquiryPurpose": "Credit",
                            "FirstName": "JOHN DOE",
                            "InquiryAddresses": [
                                {
                                    "seq": "2",
                                    "AddressType": [
                                        "O"
                                    ],
                                    "AddressLine1": "123 Main Street",
                                    "State": "CA",
                                    "Postal": "90210"
                                }
                            ],
                            "InquiryPhones": [
                                {
                                    "seq": "1",
                                    "PhoneType": [
                                        "M"
                                    ],
                                    "Number": "9876543210"
                                }
                            ],
                            "IDDetails": [
                                {
                                    "seq": "1",
                                    "IDType": "P",
                                    "IDValue": "ABCDE1234F",
                                    "Source": "Inquiry"
                                }
                            ],
                            "DOB": "1990-05-15"
                        },
                        "Score": [
                            {
                                "Type": "FICO",
                                "Version": "5.0"
                            }
                        ],
                        "CIRReportData": {
                            "IDAndContactInfo": {
                                "PersonalInfo": {
                                    "Name": {
                                        "FullName": "JOHN DOE",
                                        "FirstName": "JOHN",
                                        "LastName": "DOE"
                                    },
                                    "AliasName": {},
                                    "DateOfBirth": "1990-05-15",
                                    "Gender": "Male",
                                    "Age": {
                                        "Age": "33"
                                    },
                                    "PlaceOfBirthInfo": {}
                                },
                                "IdentityInfo": {
                                    "PANId": [
                                        {
                                            "seq": "1",
                                            "ReportedDate": "2015-07-31",
                                            "IdNumber": "ABCDE1234F"
                                        }
                                    ],
                                    "Passport": [
                                        {
                                            "seq": "1",
                                            "ReportedDate": "2015-07-31",
                                            "IdNumber": "P1234567"
                                        }
                                    ]
                                },
                                "AddressInfo": [
                                    {
                                        "Seq": "2",
                                        "ReportedDate": "2015-07-31",
                                        "Address": "789 Pine Street",
                                        "State": "CA",
                                        "Postal": "90210",
                                        "Type": "Office"
                                    },
                                    {
                                        "Seq": "1",
                                        "ReportedDate": "2015-07-31",
                                        "Address": "123 Main Street",
                                        "State": "CA",
                                        "Postal": "90210",
                                        "Type": "Primary"
                                    }
                                ],
                                "PhoneInfo": [
                                    {
                                        "seq": "2",
                                        "typeCode": "H",
                                        "ReportedDate": "2015-07-31",
                                        "Number": "9879876543"
                                    }
                                ],
                                "EmailAddressInfo": [
                                    {
                                        "seq": "1",
                                        "ReportedDate": "2015-07-31",
                                        "Email": "john.doe@email.com"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "InquiryResponseHeader": {
                            "CustomerCode": "CUSTOMER002",
                            "CustRefField": "789012",
                            "ReportOrderNO": "34567890",
                            "ProductCode": [
                                "IDCR"
                            ],
                            "SuccessCode": "1",
                            "Date": "2023-11-19",
                            "Time": "09:15:45",
                            "HitCode": "15",
                            "CustomerName": "ABC Corporation"
                        },
                        "InquiryRequestInfo": {
                            "InquiryPurpose": "Credit",
                            "FirstName": "ALICE JOHNSON",
                            "InquiryAddresses": [
                                {
                                    "seq": "3",
                                    "AddressType": [
                                        "O"
                                    ],
                                    "AddressLine1": "789 Pine Street",
                                    "State": "CA",
                                    "Postal": "90210"
                                }
                            ],
                            "InquiryPhones": [
                                {
                                    "seq": "2",
                                    "PhoneType": [
                                        "H"
                                    ],
                                    "Number": "9879876543"
                                }
                            ],
                            "IDDetails": [
                                {
                                    "seq": "2",
                                    "IDType": "A",
                                    "IDValue": "XYZAB1234C",
                                    "Source": "Inquiry"
                                }
                            ],
                            "DOB": "1987-12-15"
                        },
                        "Score": [
                            {
                                "Type": "FICO",
                                "Version": "8.0"
                            }
                        ],
                        "CIRReportData": {
                            "IDAndContactInfo": {
                                "PersonalInfo": {
                                    "Name": {
                                        "FullName": "ALICE JOHNSON",
                                        "FirstName": "ALICE",
                                        "LastName": "JOHNSON"
                                    },
                                    "AliasName": {},
                                    "DateOfBirth": "1987-12-15",
                                    "Gender": "Female",
                                    "Age": {
                                        "Age": "35"
                                    },
                                    "PlaceOfBirthInfo": {}
                                },
                                "IdentityInfo": {
                                    "PANId": [
                                        {
                                            "seq": "2",
                                            "ReportedDate": "2016-02-28",
                                            "IdNumber": "XYZAB1234C"
                                        }
                                    ],
                                    "Passport": [
                                        {
                                            "seq": "2",
                                            "ReportedDate": "2016-02-28",
                                            "IdNumber": "P9876543"
                                        }
                                    ]
                                },
                                "AddressInfo": [
                                    {
                                        "Seq": "2",
                                        "ReportedDate": "2016-02-28",
                                        "Address": "789 Pine Street",
                                        "State": "CA",
                                        "Postal": "90210",
                                        "Type": "Office"
                                    }
                                ],
                                "PhoneInfo": [
                                    {
                                        "seq": "2",
                                        "typeCode": "H",
                                        "ReportedDate": "2016-02-28",
                                        "Number": "9879876543"
                                    }
                                ]
                            }
                        }
                    }
                ],
                "status_code": 200,
                "success": true,
                "message": "Success",
                "message_code": "success"
            }
        },
        "credit_report_link": ""
    },
    "status_code": 200,
    "success": true,
    "message": "Success",
    "message_code": "success"
}

{
    "data": {
        "client_id": "credit_report_v2_PTNzvmpKROxbBrRDdrjz",
        "id_number": "********5514",
        "id_type": "aadhaar",
        "mobile": "8079012345",
        "name": "Vishal Rathore",
        "credit_score": "",
        "credit_report": {},
        "credit_report_link": ""
    },
    "status_code": 422,
    "success": false,
    "message": "Verification Failed.",
    "message_code": "verification_failed"
}
