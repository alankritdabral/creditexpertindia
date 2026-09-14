the query 
curl --location 'https://app.surepass.app/production/api/v1/credit-report-cibil/fetch-report' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer TOKEN' \
--data-raw '{
    "mobile": "9912345675",
    "pan": "EKRPR1234F",
    "name": "Vishal Rathore",
    "gender": "male",
    "consent": "Y"
}'

{
    "data": {
        "client_id": "credit_report_cibil_ggXPwjqdgRSaInRLfxpZ",
        "mobile": "9898989898",
        "pan": "ABCPD1234E",
        "name": "VISHAL RATHORE",
        "gender": "male",
        "user_email": null,
        "credit_score": "750",
        "credit_report": [
            {
                "control_number": "12345677890",
                "names": [
                    {
                        "birthDate": "1990-01-01",
                        "gender": "male",
                        "index": "N01",
                        "name": "VISHAL SINGH RATHORE"
                    }
                ],
                "ids": [
                    {
                        "idNumber": "123456789",
                        "idType": "SocialId",
                        "index": "1"
                    },
                    {
                        "idNumber": "ABCPD1234E",
                        "idType": "TaxId",
                        "index": "2"
                    }
                ],
                "telephones": [
                    {
                        "enquiryEnriched": "Y",
                        "index": "1",
                        "telephoneNumber": "9999999901",
                        "telephoneType": "01"
                    }
                ],
                "emails": [
                    {
                        "emailID": "dummy.user1@example.com",
                        "index": "1"
                    }
                ],
                "employment": [
                    {
                        "accountType": "Credit Card",
                        "dateReported": "2026-01-01",
                        "index": "E01",
                        "occupationCode": "Salaried",
                        "name": "DUMMY EMPLOYER 1",
                        "income": "",
                        "monthly_annual_income_indicator": "Monthly",
                        "net_gross_income_indicator": "Gross Income"
                    }
                ],
                "scores": [
                    {
                        "score": "750",
                        "scoreCardName": "CIBILTUSC3",
                        "scoreCardVersion": "",
                        "scoreDate": "2026-01-01",
                        "scoreName": "CIBILTransUnionScore3",
                        "reasonCodes": [
                            {
                                "reasonCodeName": "reasonCode 39",
                                "reasonCodeValue": "39"
                            }
                        ]
                    }
                ],
                "addresses": [
                    {
                        "addressCategory": "03",
                        "dateReported": "2026-01-01",
                        "index": "1",
                        "line1": "DUMMY ADDRESS LINE 1",
                        "line2": "",
                        "ownership_code": "",
                        "pinCode": "110001",
                        "residence_code": "",
                        "stateCode": "07"
                    }
                ],
                "accounts": [
                    {
                        "accountType": "Credit Card",
                        "accountNumber": "MOCKACCOUNT0001",
                        "actualPaymentAmount": "1000",
                        "creditFacilityStatus": "",
                        "suitFiledStatus": "",
                        "amountOverdue": "0",
                        "currentBalance": "1000",
                        "dateOpened": "2026-01-01",
                        "dateReported": "2026-01-01",
                        "highCreditAmount": "1000",
                        "index": "0",
                        "lastPaymentDate": "2026-01-01",
                        "memberShortName": "DUMMY LENDER 1",
                        "ownershipIndicator": "Individual",
                        "paymentStartDate": "2026-01-01",
                        "paymentEndDate": "2026-01-01",
                        "paymentFrequency": "03",
                        "paymentHistory": "000",
                        "woAmountPrincipal": "-1",
                        "woAmountTotal": "-1",
                        "settlementAmount": "-1",
                        "dateClosed": "NA",
                        "termMonths": "12",
                        "monthlyPayStatus": [
                            {
                                "date": "2026-01-01",
                                "status": "0"
                            }
                        ],
                        "emiAmount": "1000",
                        "repaymentTenure": "12",
                        "suitFiledWillfulDefaultWrittenOff": "",
                        "interest_rate": "10.00",
                        "collateral_type": "",
                        "collateral_value": "-1",
                        "cash_limit": "1000"
                    }
                ],
                "enquiries": [
                    {
                        "enquiryAmount": "1000",
                        "enquiryDate": "2026-01-01",
                        "enquiryPurpose": "02",
                        "index": "1",
                        "memberShortName": "DUMMY LENDER 1"
                    }
                ],
                "response": {
                    "consumerSummaryresp": {
                        "accountSummary": {
                            "totalAccounts": 1,
                            "highCreditAmount": 1000,
                            "currentBalance": 1000,
                            "overdueAccounts": 0,
                            "overdueBalance": 0,
                            "zeroBalanceAccounts": 0,
                            "recentDateOpened": "2026-01-01",
                            "oldestDateOpened": "2026-01-01"
                        },
                        "inquirySummary": {
                            "totalInquiry": 4,
                            "inquiryPast30Days": "1",
                            "inquiryPast12Months": "2",
                            "inquiryPast24Months": "1",
                            "recentInquiryDate": "2026-01-01"
                        }
                    }
                }
            }
        ]
    },
    "status_code": 200,
    "success": true,
    "message": null,
    "message_code": "success"
}

{
    "data": {
        "client_id": "credit_report_cibil_bunzktimSdtubnWxMkfq",
        "mobile": "9988776655",
        "pan": "EKRPR1234F",
        "name": "Vishal Rathore",
        "gender": "male",
        "credit_score": null,
        "credit_report": []
    },
    "status_code": 422,
    "success": false,
    "message": "Consumer Not Found In Bureau",
    "message_code": "verification_error"
}

{
    "data": {
        "client_id": "credit_report_cibil_UImlgOexyvNdsfWxhupR",
        "mobile": "9898981234",
        "pan": "ABCPD1234E",
        "name": "DUMMY UESR",
        "gender": "male",
        "user_email": null,
        "credit_score": null,
        "credit_report": []
    },
    "status_code": 422,
    "success": false,
    "message": "Please enter the mobile number linked to your credit report.",
    "message_code": "invalid_mobile_number"
}

