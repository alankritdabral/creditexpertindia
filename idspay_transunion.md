Service Name: Transunion Credit Report V5

Environment
Credentials will be same for production and UAT Environment. Need to change only base URL as per the Environment with Endpoint.
Base Url for Production :https://javabackend.idspay.in/api/v1/prod

Base Url for UAT :https://javabackend.idspay.in/api/v1/uat

Current Environment Status: PRODUCTION

Endpoint: /srv5/transunion-Score-Hybrid

API ID : Login ID will be the API ID(Example: APID03XXXX)
API Key : You can find the API Key from the IP Whitelist Menu(Example: 7&XXXX-XXXXX-XXXXXX-XXXX)
Token ID : You can get the Token ID once the IP has been whitelisted from the IP Whitelist Menu. Token ID will be different for each IP Address(Example: 7&XXXXXXXXXXX)
Account Status : Make sure the API account is activated before service utilization.
Introduction
{}

Description : Obtain the full credit report of consumer from Transunion Bureau.

Request Body
Key	Requirement	Value / Description
api_id	Mandatory	
api_key	Mandatory	
token_id	Mandatory	
forename	Mandatory	Enter First Name ex. Ram
surname	Mandatory	Enter last Name ex. SIngh
gender	Mandatory	Gender either Male, Female
phone_number	Mandatory	
pan_id	Mandatory	
date_of_birth	Optional	YYYY-MM-DD


Endpoint
POST
/srv5/transunion-Score-Hybrid
Copy
Content Type

application/json
Request:

{
  "api_id": "APXXXXX6",
  "api_key": "bXXXf-8XXX7-XXXX-XXXX1-d0XXXXXX1e88",
  "token_id": "6XXXXXXXXXXXXXXaWoq",
  "forename": "PrXXXX",
  "surname": "KuXXXX",
  "phone_number": "897XXXXXX7",
  "gender": "Male",
  "pan_id":"XXXXXXXXXXX", 
  "date_of_birth": "YYYY-MM-DD"
}
Response:

{
  "status": {
    "code": 200,
    "type": "success",
    "message": "CIBIL report ready! Click the link to view your score."
  },
  "message": "CIBIL report ready! Click the link to view your score.",
  "data": {
    "status": "success",
    "web_token_url": "htXXXXXXXXXJSv4mGPlfibTOTBUgH2kwlRVdUWZ1I",
    "client_key": "tu_bXXXXXXXa9758",
    "steps_summary": [
      {
        "step": 1,
        "name": "FulfillOffer",
        "status": "success"
      },
      {
        "step": 2,
        "name": "GetAuthenticationQuestions",
        "status": "success"
      },
      {
        "step": 3,
        "name": "GetCustomerAssets",
        "status": "success"
      },
      {
        "step": 4,
        "name": "GetProductWebToken",
        "status": "success"
      }
    ],
    "steps": [
      {
        "step": 1,
        "name": "FulfillOffer",
        "status": "success",
        "http_code": 200,
        "response": {
          "FulfillOfferResponse": {
            "ResponseStatus": "Success",
            "ResponseKey": "e9fXXXXXX70877:-4302a953:19fa73705f7:-1f21",
            "FulfillOfferSuccess": {
              "Status": "InProgress"
            }
          }
        }
      },
      {
        "step": 2,
        "name": "GetAuthenticationQuestions",
        "status": "success",
        "http_code": 200,
        "response": {
          "GetAuthenticationQuestionsResponse": {
            "ResponseStatus": "Success",
            "ResponseKey": "e9fbXXXX877:-4302a953:19fa73705f7:-1ed1",
            "GetAuthenticationQuestionsSuccess": {
              "ChallengeConfigGUID": "2266339819",
              "IVStatus": "Success"
            }
          }
        }
      },
      {
        "step": 3,
        "name": "GetCustomerAssets",
        "status": "success",
        "http_code": 200,
        "response": {
          "GetCustomerAssetsResponse": {
            "ResponseStatus": "Success",
            "ResponseKey": "f51XXXXf3f:-19abcad8:19fa7317edb:19c5",
            "GetCustomerAssetsSuccess": {
              "CreditSummaryData": {
                "OldestCreditAccountPeriod": "242",
                "Inquires": "5",
                "OnTimePaymentHistory": "72.22",
                "CreditCardUtilization": "0",
                "CreditMix": "100"
              },
              "Asset": {
                "Status": "Active",
                "SafetyCheckFailure": false,
                "ExpirationDate": "2028-07-27T11:16:51.359+05:30",
                "CreationDate": "2026-07-28T11:16:51.359+05:30",
                "TrueLinkCreditReport": {
                  "ReferenceKey": "11373916056",
                  "currentversion": "5.0",
                  "Borrower": {
                    "Birth": {
                      "date": "1960-05-30+05:30",
                      "partitionSet": "0",
                      "BirthDate": {
                        "month": "5",
                        "year": "1960",
                        "day": "30"
                      },
                      "Source": {
                        "Reference": "8820cb9c-cebf-4e1d-bf7d-ae49f2095117",
                        "InquiryDate": "2026-07-28+05:30",
                        "Locale": "en_IN",
                        "BorrowerKey": "462982312",
                        "Bureau": {
                          "symbol": "CIBIL",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      },
                      "age": "0"
                    },
                    "borrowerKey": "462982312",
                    "BorrowerAddress": [
                      {
                        "Dwelling": {
                          "symbol": "03",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Ownership": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "addressOrder": "0",
                        "dateReported": "2022-02-09+05:30",
                        "partitionSet": "0",
                        "CreditAddress": {
                          "SerialNumber": "1526178766",
                          "AddressType": "",
                          "StreetAddress": "REXXXXXXXRLI KXXXXXX ROAD , , DEHRADUN",
                          "City": "",
                          "PostalCode": "XXXXX",
                          "Region": "05"
                        },
                        "Origin": {
                          "symbol": "HXXXXXXNK",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "enrichMode": "R",
                        "Source": {
                          "Reference": "882XXXXXXXXX117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        }
                      },
                      {
                        "Dwelling": {
                          "symbol": "03",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Ownership": {
                          "symbol": "02",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "addressOrder": "1",
                        "dateReported": "2018-08-31+05:30",
                        "partitionSet": "1",
                        "CreditAddress": {
                          "SerialNumber": "1012322449",
                          "AddressType": "",
                          "StreetAddress": "1XXXXXXDONE , ,",
                          "City": "",
                          "PostalCode": "248001",
                          "Region": "05"
                        },
                        "Origin": {
                          "symbol": "XXXX",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "enrichMode": "R",
                        "Source": {
                          "Reference": "8XXXXXXXX2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "XXXXXXXXXX",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        }
                      },
                      {
                        "Dwelling": {
                          "symbol": "04",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Ownership": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "addressOrder": "2",
                        "dateReported": "2015-08-31+05:30",
                        "partitionSet": "2",
                        "CreditAddress": {
                          "SerialNumber": "XXXXXXXX",
                          "AddressType": "",
                          "StreetAddress": "XXXXXXJPUR ROAD, XXXX",
                          "City": "",
                          "PostalCode": "XXXXX",
                          "Region": "05"
                        },
                        "Origin": {
                          "symbol": "SBI",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "enrichMode": "R",
                        "Source": {
                          "Reference": "88XXXXXX95117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "XXXXXXX",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        }
                      },
                      {
                        "Dwelling": {
                          "symbol": "04",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Ownership": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "addressOrder": "3",
                        "dateReported": "2012-07-31+05:30",
                        "partitionSet": "3",
                        "CreditAddress": {
                          "SerialNumber": "462810569",
                          "AddressType": "",
                          "StreetAddress": "DEHRADUN DEHRADUN",
                          "City": "",
                          "PostalCode": "248003",
                          "Region": "05"
                        },
                        "Origin": {
                          "symbol": "SBI",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "enrichMode": "U",
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-ae49f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        }
                      }
                    ],
                    "CreditScore": {
                      "CreditScoreModel": {
                        "symbol": "CIBILTUSC3",
                        "description": "",
                        "rank": "100000",
                        "abbreviation": ""
                      },
                      "CreditScoreFactor": [
                        {
                          "bureauCode": "53",
                          "Factor": {
                            "symbol": "53",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "FactorText": [
                            "explain: One of the factors your CIBIL Score depends on is the timely payments you make towards your outstanding loans and credit cards. If you have missed a payment for more than 91 days in the last 12 months, your account will be tagged as severely delinquent. Any severe delinquency will have a negative impact on your CIBIL Score even further. One way to improve your CIBIL Score is to make your payments before/by the due date. This will prevent your account from getting delinquent and will subsequently have a positive impact on your CIBIL Score.",
                            "factor: One of the our CIBIL Score is to make your payments before/by the due date. This will prevent your account from getting delinquent and will subsequently have a positive impact on your CIBIL Score."
                          ]
                        },
                        {
                          "bureauCode": "00",
                          "Factor": {
                            "symbol": "00",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "FactorText": [
                            "No Valid Factors",
                            "We're sorry, but the adverse factors affecting your Credit Score are currently unavailable. Factors that may affect your score include: payment history, outstanding debt, credit account history, recent inquiries, types of credit and other features such as bankruptcies and collection accounts."
                          ]
                        },
                        {
                          "bureauCode": "00",
                          "Factor": {
                            "symbol": "00",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "FactorText": [
                            "No Valid Factors",
                            "We're sorry, but the adverse factors affecting your Credit Score are currently unavailable. Factors that may affect your score include: payment history, outstanding debt, credit account history, recent inquiries, types of credit and other features such as bankruptcies and collection accounts."
                          ]
                        },
                        {
                          "bureauCode": "00",
                          "Factor": {
                            "symbol": "00",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "FactorText": [
                            "No Valid Factors",
                            "We're sorry, but the adverse factors affecting your Credit Score are currently unavailable. Factors that may affect your score include: payment history, outstanding debt, credit account history, recent inquiries, types of credit and other features such as bankruptcies and collection accounts."
                          ]
                        },
                        {
                          "bureauCode": "00",
                          "Factor": {
                            "symbol": "00",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "FactorText": [
                            "No Valid Factors",
                            "We're sorry, but the adverse factors affecting your Credit Score are currently unavailable. Factors that may affect your score include: payment history, outstanding debt, credit account history, recent inquiries, types of credit and other features such as bankruptcies and collection accounts."
                          ]
                        }
                      ],
                      "NoScoreReason": {
                        "symbol": "",
                        "description": "",
                        "rank": "100000",
                        "abbreviation": ""
                      },
                      "riskScore": "764",
                      "populationRank": "25",
                      "Source": {
                        "Reference": "8820XXXXXXX117",
                        "InquiryDate": "2026-07-28+05:30",
                        "Locale": "en_IN",
                        "BorrowerKey": "XXXXX",
                        "Bureau": {
                          "symbol": "CIBIL",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      },
                      "scoreName": "CIBILTransUnionScore3"
                    },
                    "Employer": {
                      "serialNumber": "XXXXX",
                      "IncomeFreqIndicator": "",
                      "NetGrossIndicator": "",
                      "dateReported": "2026-07-08+05:30",
                      "name": "",
                      "OccupationCode": {
                        "symbol": "01",
                        "description": "Salaried",
                        "rank": "100000",
                        "abbreviation": ""
                      },
                      "partitionSet": "0",
                      "CreditAddress": {
                        "AddressType": "",
                        "StreetAddress": "",
                        "City": "",
                        "PostalCode": "",
                        "Region": ""
                      },
                      "Source": {
                        "Reference": "882XXXXXXXX117",
                        "InquiryDate": "2026-07-28+05:30",
                        "Locale": "en_IN",
                        "BorrowerKey": "XXXX",
                        "Bureau": {
                          "symbol": "CIBIL",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      },
                      "account": "01"
                    },
                    "Gender": "Male",
                    "CreditStatement": {
                      "StatementType": {
                        "symbol": "DISPUTE",
                        "description": "",
                        "rank": "100000",
                        "abbreviation": ""
                      },
                      "statement": "",
                      "Source": {
                        "Reference": "8820XXXXX5117",
                        "InquiryDate": "2026-07-28+05:30",
                        "Locale": "en_IN",
                        "BorrowerKey": "XXXXX",
                        "Bureau": {
                          "symbol": "CIBIL",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      },
                      "dateUpdated": ""
                    },
                    "IdentifierPartition": {
                      "Identifier": [
                        {
                          "ID": {
                            "Id": "XXXXX",
                            "IdentifierName": "SocialId"
                          },
                          "Source": {
                            "Reference": "8820cb9XXXXXXXX095117",
                            "InquiryDate": "2026-07-28+05:30",
                            "Locale": "en_IN",
                            "BorrowerKey": "XXXXX",
                            "Bureau": {
                              "symbol": "CIBIL",
                              "description": "",
                              "rank": "100000",
                              "abbreviation": ""
                            }
                          }
                        },
                        {
                          "ID": {
                            "SerialNumber": "XXXXXX",
                            "Id": "XXXXXXXXX",
                            "IdentifierName": "TaxId"
                          },
                          "enrichMode": "R",
                          "Source": {
                            "Reference": "8820cb9XXXXXX9f2095117",
                            "InquiryDate": "2026-07-28+05:30",
                            "Locale": "en_IN",
                            "BorrowerKey": "XXXXX",
                            "Bureau": {
                              "symbol": "CIBIL",
                              "description": "",
                              "rank": "100000",
                              "abbreviation": ""
                            }
                          }
                        },
                        {
                          "ID": {
                            "SerialNumber": "XXXXXX",
                            "Id": "171419",
                            "IdentifierName": "RationCardId"
                          },
                          "enrichMode": "R",
                          "Source": {
                            "Reference": "8820cb9c-cebf-4e1d-bf7d-aeXXXX95117",
                            "InquiryDate": "2026-07-28+05:30",
                            "Locale": "en_IN",
                            "BorrowerKey": "XXXXXXX",
                            "Bureau": {
                              "symbol": "CIBIL",
                              "description": "",
                              "rank": "100000",
                              "abbreviation": ""
                            }
                          }
                        },
                        {
                          "ID": {
                            "SerialNumber": "XXXXX",
                            "Id": "XXXX",
                            "IdentifierName": "CkycId"
                          },
                          "enrichMode": "R",
                          "Source": {
                            "Reference": "8820cb9c-cebf-4e1d-XXXXXX-ae49f2095117",
                            "InquiryDate": "2026-07-28+05:30",
                            "Locale": "en_IN",
                            "BorrowerKey": "XXXXXXX",
                            "Bureau": {
                              "symbol": "CIBIL",
                              "description": "",
                              "rank": "100000",
                              "abbreviation": ""
                            }
                          }
                        }
                      ]
                    },
                    "BorrowerName": {
                      "Name": {
                        "Surname": "XXXX XXXX",
                        "Forename": "XXX XXXX"
                      },
                      "partitionSet": "0",
                      "NameType": {
                        "symbol": "",
                        "description": "",
                        "rank": "100000",
                        "abbreviation": ""
                      },
                      "Source": {
                        "Reference": "882XXXXXXXXXX5117",
                        "InquiryDate": "2026-07-28+05:30",
                        "Locale": "en_IN",
                        "BorrowerKey": "XXXXXXXX",
                        "Bureau": {
                          "symbol": "CIBIL",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      }
                    },
                    "BorrowerTelephone": [
                      {
                        "partitionSet": "0",
                        "PhoneNumber": {
                          "SerialNumber": "XXXXX",
                          "Number": "XXXXX"
                        },
                        "enrichMode": "R",
                        "Source": {
                          "Reference": "8XXXXXX5117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "XXXX",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "PhoneType": {
                          "symbol": "01",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      },
                      {
                        "partitionSet": "1",
                        "PhoneNumber": {
                          "SerialNumber": "XXXXXXX",
                          "Number": "XXXXXX"
                        },
                        "enrichMode": "R",
                        "Source": {
                          "Reference": "88XXXXXX95117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "XXXXXX",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "PhoneType": {
                          "symbol": "03",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      },
                      {
                        "partitionSet": "2",
                        "PhoneNumber": {
                          "SerialNumber": "XXXXXXX",
                          "Number": "XXXXX"
                        },
                        "enrichMode": "R",
                        "Source": {
                          "Reference": "8XXXX7",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "XXXXX",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "PhoneType": {
                          "symbol": "01",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      },
                      {
                        "partitionSet": "3",
                        "PhoneNumber": {
                          "SerialNumber": "XXXX",
                          "Number": "XXX"
                        },
                        "enrichMode": "R",
                        "Source": {
                          "Reference": "8XXXXXX17",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "PhoneType": {
                          "symbol": "01",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        }
                      }
                    ]
                  },
                  "SafetyCheckPassed": true,
                  "Frozen": "",
                  "Message": {
                    "Code": {
                      "symbol": "",
                      "description": "",
                      "rank": "100000",
                      "abbreviation": ""
                    },
                    "text": "",
                    "Type": {
                      "symbol": "ZZ",
                      "description": "",
                      "rank": "100000",
                      "abbreviation": ""
                    }
                  },
                  "Sources": {
                    "Source": {
                      "InquiryDate": "2026-07-28T11:16:48.000+05:30",
                      "Bureau": {
                        "symbol": "CIBIL",
                        "description": "",
                        "rank": "100000",
                        "abbreviation": ""
                      },
                      "OriginalData": "eyJjb250cm9sRGF0YSI6eyifV19XSwiZXJyb3IiOltdfX0="
                    }
                  },
                  "DeceasedIndicator": false,
                  "FraudIndicator": false,
                  "TradeLinePartition": [
                    {
                      "accountTypeAbbreviation": "",
                      "accountTypeDescription": "",
                      "accountTypeSymbol": "01",
                      "Tradeline": {
                        "DisputeFlag": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "creditorName": "HDFC BANK",
                        "branch": "",
                        "highBalance": "607998",
                        "dateOpened": "2022-03-19+05:30",
                        "dateReported": "2026-07-08+05:30",
                        "accountsSoldTo": "",
                        "bureau": "",
                        "writtenOffAmtTotal": "-1",
                        "PayStatus": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "currentBalance": "95730",
                        "subscriberCode": "3080001",
                        "AccountDesignator": {
                          "symbol": "4",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "dateAccountStatus": "2026-07-08+05:30",
                        "accountNumber": "XXXXXX",
                        "AccountCondition": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Source": {
                          "Reference": "8820cb9c-cebf-4XXXX9f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "XXXXX",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "thirdPartyName": "",
                        "GrantedTrade": {
                          "interestRate": "-1.00",
                          "PaymentFrequency": {
                            "symbol": "03",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "serialNumber": "XXXXXX",
                          "PayStatusHistory": {
                            "endDate": "2023-08-01+05:30",
                            "startDate": "2026-07-01+05:30",
                            "MonthlyPayStatus": [
                              {
                                "date": "2026-07-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-06-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-05-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-04-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-03-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-02-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-01-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-10-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-09-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-08-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-07-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-06-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-05-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-04-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-03-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-02-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-01-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-10-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-09-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-08-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-07-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-06-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-05-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-04-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-03-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-02-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-01-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-10-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-09-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-08-01+05:30",
                                "status": "0"
                              }
                            ],
                            "status": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"
                          },
                          "EMIAmount": "-1",
                          "WorstPayStatus": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CashLimit": "-1",
                          "dateLastPayment": "2026-07-08+05:30",
                          "AccountType": {
                            "symbol": "01",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CreditType": {
                            "symbol": "01",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "actualPaymentAmount": "-1",
                          "termMonths": "-1",
                          "CreditLimit": "-1",
                          "CollateralType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "amountPastDue": "0",
                          "collateral": "-1",
                          "TermType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "VerificationIndicator": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "noOfParticipants": "",
                        "OpenClosed": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "position": "0",
                        "settlementAmount": "-1",
                        "writtenOffPrincipal": "-1"
                      }
                    },
                    {
                      "accountTypeAbbreviation": "",
                      "accountTypeDescription": "",
                      "accountTypeSymbol": "01",
                      "Tradeline": {
                        "DisputeFlag": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "creditorName": "HDFC BANK",
                        "branch": "",
                        "highBalance": "386761",
                        "dateOpened": "2018-04-04+05:30",
                        "dateReported": "2026-07-02+05:30",
                        "accountsSoldTo": "",
                        "bureau": "",
                        "writtenOffAmtTotal": "-1",
                        "PayStatus": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "currentBalance": "0",
                        "subscriberCode": "XXXXX",
                        "AccountDesignator": {
                          "symbol": "4",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "dateAccountStatus": "2025-11-08+05:30",
                        "accountNumber": "XXXXX",
                        "AccountCondition": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-XXXXX-ae49f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "46XXXXXX12",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "thirdPartyName": "",
                        "GrantedTrade": {
                          "interestRate": "-1.00",
                          "PaymentFrequency": {
                            "symbol": "03",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "serialNumber": "102XXX9",
                          "PayStatusHistory": {
                            "endDate": "2023-08-01+05:30",
                            "startDate": "2026-07-01+05:30",
                            "MonthlyPayStatus": [
                              {
                                "date": "2026-07-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-06-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-05-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-04-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-03-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-02-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2026-01-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-10-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-09-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2025-08-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2025-07-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2025-06-01+05:30",
                                "status": "24"
                              },
                              {
                                "date": "2025-05-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2025-04-01+05:30",
                                "status": "24"
                              },
                              {
                                "date": "2025-03-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2025-02-01+05:30",
                                "status": "22"
                              },
                              {
                                "date": "2025-01-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2024-12-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2024-11-01+05:30",
                                "status": "24"
                              },
                              {
                                "date": "2024-10-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2024-09-01+05:30",
                                "status": "24"
                              },
                              {
                                "date": "2024-08-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2024-07-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2024-06-01+05:30",
                                "status": "24"
                              },
                              {
                                "date": "2024-05-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2024-04-01+05:30",
                                "status": "24"
                              },
                              {
                                "date": "2024-03-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-02-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2024-01-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-10-01+05:30",
                                "status": "25"
                              },
                              {
                                "date": "2023-09-01+05:30",
                                "status": "24"
                              },
                              {
                                "date": "2023-08-01+05:30",
                                "status": "25"
                              }
                            ],
                            "status": "0,0,0,0,0,0,0,0,0,0,0,25,25,24,25,24,25,22,25,25,24,25,24,25,25,24,25,24,0,0,0,0,0,25,24,25,"
                          },
                          "EMIAmount": "-1",
                          "WorstPayStatus": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CashLimit": "-1",
                          "dateLastPayment": "2025-11-08+05:30",
                          "AccountType": {
                            "symbol": "01",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CreditType": {
                            "symbol": "01",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "actualPaymentAmount": "-1",
                          "termMonths": "-1",
                          "CreditLimit": "-1",
                          "CollateralType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "amountPastDue": "0",
                          "collateral": "-1",
                          "TermType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "VerificationIndicator": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "noOfParticipants": "",
                        "OpenClosed": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "position": "1",
                        "settlementAmount": "-1",
                        "writtenOffPrincipal": "-1"
                      }
                    },
                    {
                      "accountTypeAbbreviation": "",
                      "accountTypeDescription": "",
                      "accountTypeSymbol": "13",
                      "Tradeline": {
                        "DisputeFlag": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "creditorName": "XXXX",
                        "dateClosed": "2019-04-30+05:30",
                        "branch": "",
                        "highBalance": "40000",
                        "dateOpened": "2018-03-21+05:30",
                        "dateReported": "2023-09-30+05:30",
                        "accountsSoldTo": "",
                        "bureau": "",
                        "writtenOffAmtTotal": "-1",
                        "PayStatus": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "currentBalance": "0",
                        "subscriberCode": "XX",
                        "AccountDesignator": {
                          "symbol": "1",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "dateAccountStatus": "2019-04-30+05:30",
                        "accountNumber": "MFUKMFLONS000005019585",
                        "AccountCondition": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-ae49f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "thirdPartyName": "",
                        "GrantedTrade": {
                          "interestRate": "-1.00",
                          "PaymentFrequency": {
                            "symbol": "03",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "serialNumber": "1052944640",
                          "PayStatusHistory": {
                            "endDate": "2020-10-01+05:30",
                            "startDate": "2023-09-01+05:30",
                            "MonthlyPayStatus": [
                              {
                                "date": "2023-09-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2023-07-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2023-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2023-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2023-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2023-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2023-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2023-01-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-12-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-11-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-10-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-09-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-07-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2022-01-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-12-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-11-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-10-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-09-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-07-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-01-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2020-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-10-01+05:30",
                                "status": "0"
                              }
                            ],
                            "status": "0,XXX,0,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,0,0,0,"
                          },
                          "EMIAmount": "3333",
                          "WorstPayStatus": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CashLimit": "-1",
                          "dateLastPayment": "2019-04-30+05:30",
                          "AccountType": {
                            "symbol": "13",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CreditType": {
                            "symbol": "13",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "actualPaymentAmount": "-1",
                          "termMonths": "12",
                          "CreditLimit": "-1",
                          "CollateralType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "amountPastDue": "0",
                          "collateral": "-1",
                          "TermType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "VerificationIndicator": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "noOfParticipants": "",
                        "OpenClosed": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "position": "2",
                        "settlementAmount": "-1",
                        "writtenOffPrincipal": "-1"
                      }
                    },
                    {
                      "accountTypeAbbreviation": "",
                      "accountTypeDescription": "",
                      "accountTypeSymbol": "05",
                      "Tradeline": {
                        "DisputeFlag": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "creditorName": "SBI",
                        "dateClosed": "2022-04-28+05:30",
                        "branch": "",
                        "highBalance": "300000",
                        "dateOpened": "2017-02-06+05:30",
                        "dateReported": "2022-04-30+05:30",
                        "accountsSoldTo": "",
                        "bureau": "",
                        "writtenOffAmtTotal": "-1",
                        "PayStatus": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "currentBalance": "0",
                        "subscriberCode": "10001",
                        "AccountDesignator": {
                          "symbol": "1",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "dateAccountStatus": "2021-06-24+05:30",
                        "accountNumber": "00000036518184846",
                        "AccountCondition": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-ae49f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "thirdPartyName": "",
                        "GrantedTrade": {
                          "interestRate": "12.00",
                          "PaymentFrequency": {
                            "symbol": "03",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "serialNumber": "815767964",
                          "PayStatusHistory": {
                            "endDate": "2019-05-01+05:30",
                            "startDate": "2022-04-01+05:30",
                            "MonthlyPayStatus": [
                              {
                                "date": "2022-04-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2022-03-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2022-02-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2022-01-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-12-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-11-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-10-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-09-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-08-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-07-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-06-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-05-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-04-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-03-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-02-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2021-01-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-12-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-11-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-10-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-09-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-08-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-07-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-06-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-05-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-04-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-03-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-02-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2020-01-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2019-12-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2019-11-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2019-10-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2019-09-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2019-08-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2019-07-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2019-06-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2019-05-01+05:30",
                                "status": "STD"
                              }
                            ],
                            "status": "STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,"
                          },
                          "EMIAmount": "6742",
                          "WorstPayStatus": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CashLimit": "-1",
                          "dateLastPayment": "2021-06-24+05:30",
                          "AccountType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CreditType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "actualPaymentAmount": "-1",
                          "termMonths": "70",
                          "CreditLimit": "-1",
                          "CollateralType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "amountPastDue": "-1",
                          "collateral": "-1",
                          "TermType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "VerificationIndicator": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "noOfParticipants": "",
                        "OpenClosed": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "position": "3",
                        "settlementAmount": "-1",
                        "writtenOffPrincipal": "-1"
                      }
                    },
                    {
                      "accountTypeAbbreviation": "",
                      "accountTypeDescription": "",
                      "accountTypeSymbol": "05",
                      "Tradeline": {
                        "DisputeFlag": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "creditorName": "SBI",
                        "dateClosed": "2016-11-30+05:30",
                        "branch": "",
                        "highBalance": "100000",
                        "dateOpened": "2013-05-07+05:30",
                        "dateReported": "2016-12-31+05:30",
                        "accountsSoldTo": "",
                        "bureau": "",
                        "writtenOffAmtTotal": "-1",
                        "PayStatus": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "currentBalance": "0",
                        "subscriberCode": "10001",
                        "AccountDesignator": {
                          "symbol": "1",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "accountNumber": "00000032983075935",
                        "AccountCondition": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-ae49f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "thirdPartyName": "",
                        "GrantedTrade": {
                          "interestRate": "14.00",
                          "PaymentFrequency": {
                            "symbol": "03",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "serialNumber": "428597960",
                          "PayStatusHistory": {
                            "endDate": "2013-12-01+05:30",
                            "startDate": "2016-11-01+05:30",
                            "MonthlyPayStatus": [
                              {
                                "date": "2016-11-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-10-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-09-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-08-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-07-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-06-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-05-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-04-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-03-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-02-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-01-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-12-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-11-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-10-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-09-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-08-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-07-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-06-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-05-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-04-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-03-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-02-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2015-01-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-12-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-11-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-10-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-09-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-08-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-07-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-06-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-05-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-04-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-03-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-02-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2014-01-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2013-12-01+05:30",
                                "status": "STD"
                              }
                            ],
                            "status": "STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,STD,"
                          },
                          "EMIAmount": "3088",
                          "WorstPayStatus": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CashLimit": "-1",
                          "AccountType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CreditType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "actualPaymentAmount": "-1",
                          "termMonths": "60",
                          "CreditLimit": "-1",
                          "CollateralType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "amountPastDue": "-1",
                          "collateral": "-1",
                          "TermType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "VerificationIndicator": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "noOfParticipants": "",
                        "OpenClosed": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "position": "4",
                        "settlementAmount": "-1",
                        "writtenOffPrincipal": "-1"
                      }
                    },
                    {
                      "accountTypeAbbreviation": "",
                      "accountTypeDescription": "",
                      "accountTypeSymbol": "05",
                      "Tradeline": {
                        "DisputeFlag": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "creditorName": "BAJAJ FIN LTD",
                        "dateClosed": "2021-05-21+05:30",
                        "branch": "",
                        "highBalance": "30000",
                        "dateOpened": "2011-01-17+05:30",
                        "dateReported": "2021-06-30+05:30",
                        "accountsSoldTo": "",
                        "bureau": "",
                        "writtenOffAmtTotal": "-1",
                        "PayStatus": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "currentBalance": "0",
                        "subscriberCode": "66030001",
                        "AccountDesignator": {
                          "symbol": "4",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "dateAccountStatus": "2013-10-22+05:30",
                        "accountNumber": "5450PL00002043",
                        "AccountCondition": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-ae49f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "thirdPartyName": "",
                        "GrantedTrade": {
                          "interestRate": "-1.00",
                          "PaymentFrequency": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "serialNumber": "254504304",
                          "PayStatusHistory": {
                            "endDate": "2018-07-01+05:30",
                            "startDate": "2021-06-01+05:30",
                            "MonthlyPayStatus": [
                              {
                                "date": "2021-06-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2021-05-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2021-04-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2021-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2021-02-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2021-01-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-10-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-09-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-08-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-07-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-06-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-05-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-04-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-03-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-02-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2020-01-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-10-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-09-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-08-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-07-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-06-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-05-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-04-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-03-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-02-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2019-01-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2018-12-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2018-11-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2018-10-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2018-09-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2018-08-01+05:30",
                                "status": "0"
                              },
                              {
                                "date": "2018-07-01+05:30",
                                "status": "0"
                              }
                            ],
                            "status": "0,0,0,XXX,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"
                          },
                          "EMIAmount": "-1",
                          "WorstPayStatus": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CashLimit": "-1",
                          "dateLastPayment": "2013-10-22+05:30",
                          "AccountType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CreditType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "actualPaymentAmount": "-1",
                          "termMonths": "-1",
                          "CreditLimit": "-1",
                          "CollateralType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "amountPastDue": "0",
                          "collateral": "-1",
                          "TermType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "VerificationIndicator": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "noOfParticipants": "",
                        "OpenClosed": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "position": "5",
                        "settlementAmount": "-1",
                        "writtenOffPrincipal": "-1"
                      }
                    },
                    {
                      "accountTypeAbbreviation": "",
                      "accountTypeDescription": "",
                      "accountTypeSymbol": "05",
                      "Tradeline": {
                        "DisputeFlag": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "creditorName": "SBI",
                        "dateClosed": "2011-02-27+05:30",
                        "branch": "",
                        "highBalance": "30000",
                        "dateOpened": "2008-02-19+05:30",
                        "dateReported": "2016-12-31+05:30",
                        "accountsSoldTo": "",
                        "bureau": "",
                        "writtenOffAmtTotal": "-1",
                        "PayStatus": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "currentBalance": "0",
                        "subscriberCode": "10001",
                        "AccountDesignator": {
                          "symbol": "1",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "accountNumber": "00000030331145562",
                        "AccountCondition": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-ae49f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "thirdPartyName": "",
                        "GrantedTrade": {
                          "interestRate": "14.00",
                          "PaymentFrequency": {
                            "symbol": "03",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "serialNumber": "416695441",
                          "PayStatusHistory": {
                            "endDate": "2014-01-01+05:30",
                            "startDate": "2016-12-01+05:30",
                            "MonthlyPayStatus": [
                              {
                                "date": "2016-12-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-11-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-10-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-09-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-07-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-01-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-12-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-11-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-10-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-09-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-07-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-01-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-12-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-11-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-10-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-09-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-07-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-01-01+05:30",
                                "status": "XXX"
                              }
                            ],
                            "status": "STD,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,"
                          },
                          "EMIAmount": "805",
                          "WorstPayStatus": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CashLimit": "-1",
                          "AccountType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CreditType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "actualPaymentAmount": "-1",
                          "termMonths": "48",
                          "CreditLimit": "-1",
                          "CollateralType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "amountPastDue": "-1",
                          "collateral": "-1",
                          "TermType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "VerificationIndicator": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "noOfParticipants": "",
                        "OpenClosed": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "position": "6",
                        "settlementAmount": "-1",
                        "writtenOffPrincipal": "-1"
                      }
                    },
                    {
                      "accountTypeAbbreviation": "",
                      "accountTypeDescription": "",
                      "accountTypeSymbol": "05",
                      "Tradeline": {
                        "DisputeFlag": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "creditorName": "SBI",
                        "dateClosed": "2008-02-19+05:30",
                        "branch": "",
                        "highBalance": "24000",
                        "dateOpened": "2006-05-24+05:30",
                        "dateReported": "2016-12-31+05:30",
                        "accountsSoldTo": "",
                        "bureau": "",
                        "writtenOffAmtTotal": "-1",
                        "PayStatus": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "currentBalance": "0",
                        "subscriberCode": "10001",
                        "AccountDesignator": {
                          "symbol": "1",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "accountNumber": "XXXXX",
                        "AccountCondition": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-aeXXXX5117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "thirdPartyName": "",
                        "GrantedTrade": {
                          "interestRate": "13.00",
                          "PaymentFrequency": {
                            "symbol": "03",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "serialNumber": "4127XXXXX7",
                          "PayStatusHistory": {
                            "endDate": "2014-01-01+05:30",
                            "startDate": "2016-12-01+05:30",
                            "MonthlyPayStatus": [
                              {
                                "date": "2016-12-01+05:30",
                                "status": "STD"
                              },
                              {
                                "date": "2016-11-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-10-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-09-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-07-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2016-01-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-12-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-11-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-10-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-09-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-07-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2015-01-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-12-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-11-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-10-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-09-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-08-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-07-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-06-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-05-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-04-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-03-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-02-01+05:30",
                                "status": "XXX"
                              },
                              {
                                "date": "2014-01-01+05:30",
                                "status": "XXX"
                              }
                            ],
                            "status": "STD,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,XXX,"
                          },
                          "EMIAmount": "617",
                          "WorstPayStatus": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CashLimit": "-1",
                          "AccountType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "CreditType": {
                            "symbol": "05",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "actualPaymentAmount": "-1",
                          "termMonths": "48",
                          "CreditLimit": "-1",
                          "CollateralType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          },
                          "amountPastDue": "-1",
                          "collateral": "-1",
                          "TermType": {
                            "symbol": "",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "VerificationIndicator": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "noOfParticipants": "",
                        "OpenClosed": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "position": "7",
                        "settlementAmount": "-1",
                        "writtenOffPrincipal": "-1"
                      }
                    }
                  ],
                  "InquiryPartition": [
                    {
                      "Inquiry": {
                        "amount": "300000",
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "inquiryType": "00",
                        "subscriberName": "TVS CREDIT",
                        "enqControlNum": "1035XXXXX79",
                        "description": "",
                        "subscriberNumber": "",
                        "bureau": "",
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-XXXXX95117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "inquiryDate": "2026-01-08+05:30"
                      }
                    },
                    {
                      "Inquiry": {
                        "amount": "300000",
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "inquiryType": "00",
                        "subscriberName": "TVS CREDIT",
                        "enqControlNum": "1005XXXXX66",
                        "description": "",
                        "subscriberNumber": "",
                        "bureau": "",
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-XXXX117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "inquiryDate": "2025-12-12+05:30"
                      }
                    },
                    {
                      "Inquiry": {
                        "amount": "600000",
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "inquiryType": "05",
                        "subscriberName": "SBI",
                        "enqControlNum": "71XXXX106",
                        "description": "",
                        "subscriberNumber": "",
                        "bureau": "",
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-XXXX5117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "inquiryDate": "2024-02-12+05:30"
                      }
                    },
                    {
                      "Inquiry": {
                        "amount": "200000",
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "inquiryType": "05",
                        "subscriberName": "SBI",
                        "enqControlNum": "XXXXX",
                        "description": "",
                        "subscriberNumber": "",
                        "bureau": "",
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-aeXXXX17",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "inquiryDate": "2023-08-25+05:30"
                      }
                    },
                    {
                      "Inquiry": {
                        "amount": "500000",
                        "IndustryCode": {
                          "symbol": "",
                          "description": "",
                          "rank": "100000",
                          "abbreviation": ""
                        },
                        "inquiryType": "00",
                        "subscriberName": "SKFINLI",
                        "enqControlNum": "XXX",
                        "description": "",
                        "subscriberNumber": "",
                        "bureau": "",
                        "Source": {
                          "Reference": "8820cb9c-cebf-4e1d-bf7d-ae49f2095117",
                          "InquiryDate": "2026-07-28+05:30",
                          "Locale": "en_IN",
                          "BorrowerKey": "462982312",
                          "Bureau": {
                            "symbol": "CIBIL",
                            "description": "",
                            "rank": "100000",
                            "abbreviation": ""
                          }
                        },
                        "inquiryDate": "2023-08-01+05:30"
                      }
                    }
                  ]
                },
                "AssetId": "XXXXXX",
                "Type": "SingleCreditReport"
              }
            }
          }
        }
      },
      {
        "step": 4,
        "name": "GetProductWebToken",
        "status": "success",
        "http_code": 200,
        "response": {
          "GetProductWebTokenResponse": {
            "ResponseKey": "c0d28c9d37c874dc:-7521aa68:19fa72ed000:14ce",
            "ResponseStatus": "Success",
            "GetProductWebTokenSuccess": {
              "PartnerCustomerId": "tu_b9524cc311cd459a9758",
              "WebToken": "bV0I36KDIoGL7xxxxxRVdUWZ1I"
            }
          }
        }
      }
    ],
    "report_url": "https://my-cxxxxxxxxxxxxxxX0%3D&Expires=1785822414",
    "message": "CIBIL report ready! Click the link to view your score.",
    "credit_report_message": {
      "message": "CIBIL report ready! Click the link to view your score.",
      "message_code": "Message code not found"
    }
  }
}

Failed Responses:

404 Error
500 Internal Error
BUREAU_UNAVAILABLE TransUnion's own service did not respond
IV_IN_PROGRESS Identity Verification In Progress
NO_HIT TransUnion CIBIL has no credit record matching the identity details