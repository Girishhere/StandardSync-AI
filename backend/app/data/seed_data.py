"""
DEMO SEED DATA for StandardSync AI.

⚠️  ALL RECORDS ARE DEMO DATA unless explicitly noted.
⚠️  Standard numbers and titles are based on publicly known BIS index information.
⚠️  Clause numbers, evidence text, and source URLs are DEMO PLACEHOLDERS.
⚠️  Replace with verified BIS document data before production deployment.

Data shape must remain stable — the frontend and search service depend on it.
To replace: update this file (or MongoDB) without changing key names.
"""

STANDARDS_DATA = [
    {
        "id": "std-001",
        "is_code": "IS 8130:2013",
        "title": "Conductors for Insulated Electrical Cables and Flexible Cords",
        "description": "Specifies requirements for conductors (including copper and aluminium) used in insulated electrical cables and flexible cords for fixed or flexible wiring applications, including hospital and industrial grade installations.",
        "category": "Electrical",
        "application": "Copper and aluminium conductors for insulated cables and flexible cords used in building wiring, industrial installations, and healthcare facilities.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "Mandatory under BIS (Conformity Assessment) Regulations 2018 for cables used in buildings and institutions."
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": "CRS applies to electronics; not applicable to bare/insulated conductors."
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": "Hallmarking applies to precious metal articles only."
            }
        ],
        "evidence": {
            "source_document": "IS 8130:2013 \u2014 Conductors for Insulated Electrical Cables and Flexible Cords [DEMO DATA \u2014 replace with verified BIS document text]",
            "clause": "Clause 4.1 \u2014 General Requirements for Conductors",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] The conductor shall be made of electrolytic copper or aluminium and shall comply with the resistance requirements specified in Table 1. Conductors intended for flexible use shall additionally meet the requirements of Clause 4.3.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [
            {
                "is_code": "IS 694:2010",
                "title": "PVC Insulated Cables for Working Voltages up to and including 1100 V",
                "relevance_note": "Covers complete cable construction using IS 8130 conductors",
                "score": 0.82,
                "relationship": "Related",
                "source": "BIS"
            },
            {
                "is_code": "IS 1554 (Part 1):1988",
                "title": "PVC Insulated (Heavy Duty) Electric Cables \u2014 Working Voltage up to 1100 V",
                "relevance_note": "Heavy duty cables for industrial/hospital fixed wiring",
                "score": 0.74,
                "relationship": "Related",
                "source": "BIS"
            }
        ],
        "is_demo": True,
        "search_text": "copper conductor insulated electrical cable flexible cord hospital grade wire building wiring industrial installation healthcare copper aluminium conductor electrolytic copper resistance cables hospital grade copper wire",
        "publication_date": "2013-01-01",
        "revision_year": 2013,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [
            {
                "is_code": "IS 10810",
                "title": "Methods of test for cables",
                "relationship": "Normative Reference",
                "relevance_note": "Test methods",
                "source": "BIS"
            }
        ],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-001"
    },
    {
        "id": "std-002",
        "is_code": "IS 694:2010",
        "title": "PVC Insulated Cables for Working Voltages up to and including 1100 V",
        "description": "Specifies requirements for PVC-insulated cables with or without sheath for use in electrical wiring installations in buildings, suitable for voltages up to 1100 V.",
        "category": "Electrical",
        "application": "Indoor and outdoor building wiring, residential and commercial electrical installations.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA \u2014 Mandatory ISI certification for electrical cables used in buildings."
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 694:2010 \u2014 PVC Insulated Cables [DEMO DATA]",
            "clause": "Clause 3.1 \u2014 Conductor",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] The conductor shall comply with the requirements of IS 8130. The nominal cross-sectional areas of the conductors shall be as given in Table 1.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [
            {
                "is_code": "IS 8130:2013",
                "title": "Conductors for Insulated Electrical Cables and Flexible Cords",
                "relevance_note": "Conductor specification referenced by IS 694",
                "score": 0.88,
                "relationship": "Related",
                "source": "BIS"
            }
        ],
        "is_demo": True,
        "search_text": "PVC insulated cable building wiring 1100V electrical wire residential commercial wiring installation cable for buildings electrical cable wiring",
        "publication_date": "2020-01-01",
        "revision_year": 2010,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [
            {
                "is_code": "IS 10810",
                "title": "Methods of test for cables",
                "relationship": "Normative Reference",
                "relevance_note": "Test methods",
                "source": "BIS"
            }
        ],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-002"
    },
    {
        "id": "std-003",
        "is_code": "IS 12235 (Part 14):2004",
        "title": "Methods of Test for Thermoplastic Pipes and Fittings \u2014 Opacity Test",
        "description": "Specifies test methods for thermoplastic piping systems including opacity, applicable to water supply and sanitation applications.",
        "category": "Construction",
        "application": "Water supply pipelines, sanitation systems, thermoplastic pipes and fittings.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA \u2014 ISI mark required for drinking water pipes."
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 12235 (Part 14):2004 [DEMO DATA]",
            "clause": "Clause 5.1 \u2014 Test Method for Opacity",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] The opacity of the pipe shall be determined using the method specified in this clause to ensure no light transmission.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [],
        "is_demo": True,
        "search_text": "thermoplastic pipe fitting water supply sanitation pipeline plumbing plastic pipe PVC pipe water pipe testing",
        "publication_date": "2020-01-01",
        "revision_year": 2004,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-003"
    },
    {
        "id": "std-004",
        "is_code": "IS 13592:2013",
        "title": "Unplasticized PVC Pipes for Soil and Waste Discharge Systems inside Buildings",
        "description": "Specifies requirements for unplasticized PVC pipes used for drainage, soil and waste discharge systems inside buildings.",
        "category": "Construction",
        "application": "Internal drainage, soil pipes, waste water systems in residential and commercial buildings.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA"
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 13592:2013 [DEMO DATA]",
            "clause": "Clause 4.1 \u2014 Material",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] The pipes shall be manufactured from unplasticized polyvinyl chloride (uPVC) conforming to the requirements of this standard.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [],
        "is_demo": True,
        "search_text": "uPVC pipe drainage soil waste discharge building drain pipe sanitation plumbing waste water",
        "publication_date": "2013-01-01",
        "revision_year": 2013,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-004"
    },
    {
        "id": "std-005",
        "is_code": "IS 2925:1984",
        "title": "Industrial Safety Helmets",
        "description": "Specifies performance requirements and test methods for industrial safety helmets intended to protect the wearer from falling objects and lateral impact.",
        "category": "Safety",
        "application": "Construction sites, mining operations, industrial facilities \u2014 head protection for workers.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA \u2014 ISI mark mandatory for safety helmets per PPE guidelines."
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 2925:1984 \u2014 Industrial Safety Helmets [DEMO DATA]",
            "clause": "Clause 5.2 \u2014 Shock Absorption Test",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] The helmet, when tested in accordance with the method described in Annex B, shall not transmit a force greater than 5 kN to the headform.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [
            {
                "is_code": "IS 4770:1991",
                "title": "Rubber Gloves \u2014 Electrical Purposes",
                "relevance_note": "Related PPE for industrial safety",
                "score": 0.63,
                "relationship": "Related",
                "source": "BIS"
            }
        ],
        "is_demo": True,
        "search_text": "safety helmet hard hat head protection industrial construction mining workers PPE personal protective equipment safety helmet for workers industrial workers",
        "publication_date": "2020-01-01",
        "revision_year": 1984,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-005"
    },
    {
        "id": "std-006",
        "is_code": "IS 4770:1991",
        "title": "Rubber Gloves \u2014 Electrical Purposes",
        "description": "Specifies requirements for rubber insulating gloves used for protection against electric shock when working on or near live electrical equipment.",
        "category": "Safety",
        "application": "Electrical work, maintenance of live equipment, high-voltage installations.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA"
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 4770:1991 \u2014 Rubber Gloves for Electrical Purposes [DEMO DATA]",
            "clause": "Clause 6.1 \u2014 Electrical Test",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] Gloves shall withstand the proof test voltage specified in Table 2 without evidence of breakdown or puncture.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [
            {
                "is_code": "IS 2925:1984",
                "title": "Industrial Safety Helmets",
                "relevance_note": "Complementary PPE standard",
                "score": 0.61,
                "relationship": "Related",
                "source": "BIS"
            }
        ],
        "is_demo": True,
        "search_text": "rubber gloves electrical insulating gloves PPE protection electric shock live equipment high voltage safety gloves electrical protection",
        "publication_date": "2020-01-01",
        "revision_year": 1991,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-006"
    },
    {
        "id": "std-007",
        "is_code": "IS 14543:2016",
        "title": "Packaged Drinking Water (Other Than Packaged Natural Mineral Water)",
        "description": "Specifies quality requirements for packaged drinking water including physical, chemical, and microbiological parameters.",
        "category": "Consumer Products",
        "application": "Bottled drinking water, packaged water for retail and institutional supply.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA \u2014 Mandatory ISI certification for packaged drinking water."
            },
            {
                "name": "FSSAI Approval",
                "status": "applicable",
                "note": "DEMO DATA \u2014 Food Safety and Standards Authority of India approval also required."
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 14543:2016 \u2014 Packaged Drinking Water [DEMO DATA]",
            "clause": "Clause 3.2 \u2014 Chemical Requirements",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] The packaged drinking water shall conform to the chemical requirements specified in Table 1, including limits for total dissolved solids, pH, hardness, and heavy metals.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [
            {
                "is_code": "IS 13428:2005",
                "title": "Packaged Natural Mineral Water",
                "relevance_note": "Related standard for mineral water",
                "score": 0.78,
                "relationship": "Related",
                "source": "BIS"
            }
        ],
        "is_demo": True,
        "search_text": "packaged drinking water bottled water quality drinking water parameters water quality consumer product packaged water ISI water",
        "publication_date": "2020-01-01",
        "revision_year": 2016,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-007"
    },
    {
        "id": "std-008",
        "is_code": "IS 16046 (Part 1):2018",
        "title": "LED Luminaires for General Lighting Purposes \u2014 Safety Requirements",
        "description": "Specifies safety requirements for LED luminaires intended for general lighting purposes for use in indoor or outdoor applications.",
        "category": "Electrical",
        "application": "LED lights, LED fixtures for residential, commercial, and outdoor lighting.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA"
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "applicable",
                "note": "DEMO DATA \u2014 LED lights are subject to CRS under Bureau of Energy Efficiency."
            },
            {
                "name": "BEE Star Rating",
                "status": "applicable",
                "note": "DEMO DATA \u2014 Energy efficiency star rating required for LED luminaires."
            }
        ],
        "evidence": {
            "source_document": "IS 16046 (Part 1):2018 \u2014 LED Luminaires Safety Requirements [DEMO DATA]",
            "clause": "Clause 4 \u2014 General Requirements",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] LED luminaires shall be designed and constructed so that they function correctly and do not constitute a hazard to persons or surroundings under conditions of normal use.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [
            {
                "is_code": "IS 16046 (Part 2):2018",
                "title": "LED Luminaires \u2014 Performance Requirements",
                "relevance_note": "Performance complement to Part 1 safety standard",
                "score": 0.91,
                "relationship": "Related",
                "source": "BIS"
            }
        ],
        "is_demo": True,
        "search_text": "LED light luminaire fixture indoor outdoor lighting LED lamp LED bulb energy efficient light LED lighting general purpose lighting",
        "publication_date": "2020-01-01",
        "revision_year": 2018,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [
            {
                "is_code": "IS 10810",
                "title": "Methods of test for cables",
                "relationship": "Normative Reference",
                "relevance_note": "Test methods",
                "source": "BIS"
            }
        ],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-008"
    },
    {
        "id": "std-009",
        "is_code": "IS 1239 (Part 1):2004",
        "title": "Mild Steel Tubes, Tubulars and Other Wrought Steel Fittings \u2014 Plain End Tubes",
        "description": "Specifies requirements for mild steel tubes for ordinary use in water, gas, steam and air lines.",
        "category": "Industrial Equipment",
        "application": "Water pipelines, gas lines, steam lines, structural applications in industrial plants.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA"
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 1239 (Part 1):2004 \u2014 Mild Steel Tubes [DEMO DATA]",
            "clause": "Clause 6 \u2014 Mechanical Properties",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] The tubes shall have a tensile strength of not less than 320 MPa and percentage elongation not less than 20 percent on a gauge length of 5.65\u221aA.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [
            {
                "is_code": "IS 1239 (Part 2):1992",
                "title": "Mild Steel Tubes \u2014 Fittings",
                "relevance_note": "Fittings standard complementing Part 1",
                "score": 0.87,
                "relationship": "Related",
                "source": "BIS"
            }
        ],
        "is_demo": True,
        "search_text": "mild steel tube pipe water gas steam air line steel pipe industrial ERW tube steel pipeline mild steel piping",
        "publication_date": "2020-01-01",
        "revision_year": 2004,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-009"
    },
    {
        "id": "std-010",
        "is_code": "IS 2062:2011",
        "title": "Hot Rolled Medium and High Tensile Structural Steel",
        "description": "Specifies requirements for hot rolled medium and high tensile structural steel including plates, strips, shapes and sections used in general structural purposes.",
        "category": "Construction",
        "application": "Structural steel for bridges, buildings, general fabrication, industrial structures.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA"
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 2062:2011 \u2014 Hot Rolled Structural Steel [DEMO DATA]",
            "clause": "Clause 5 \u2014 Mechanical Properties",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] The steel shall conform to the mechanical property requirements specified in Table 1 for the respective grade.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [],
        "is_demo": True,
        "search_text": "structural steel hot rolled plate strip section beam angle channel construction steel building structure bridge fabrication",
        "publication_date": "2020-01-01",
        "revision_year": 2011,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-010"
    },
    {
        "id": "std-011",
        "is_code": "IS 1367 (Part 3):2002",
        "title": "Technical Supply Conditions for Threaded Steel Fasteners \u2014 Mechanical Properties",
        "description": "Specifies mechanical property requirements for bolts, screws, studs and nuts made of carbon steel and alloy steel.",
        "category": "Industrial Equipment",
        "application": "Nuts, bolts, fasteners for industrial machinery, structural connections, equipment assembly.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "required",
                "note": "DEMO DATA"
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 1367 (Part 3):2002 \u2014 Threaded Fasteners [DEMO DATA]",
            "clause": "Clause 4.1 \u2014 Tensile Properties",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] Bolts and screws shall have tensile strength, proof load stress, and hardness conforming to the values specified in Table 1.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [],
        "is_demo": True,
        "search_text": "bolt nut screw fastener threaded steel fasteners mechanical properties industrial fastener hardware nuts bolts screws structural fastener",
        "publication_date": "2020-01-01",
        "revision_year": 2002,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Mandatory",
        "certification_type": "ISI Mark",
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-011"
    },
    {
        "id": "std-012",
        "is_code": "IS 3779:1999",
        "title": "Stainless Steel Sinks for Domestic Purposes",
        "description": "Specifies requirements for stainless steel sinks for use in kitchens and domestic settings, including material, construction and finish.",
        "category": "Consumer Products",
        "application": "Stainless steel kitchen sinks, domestic plumbing fixtures.",
        "source": "Bureau of Indian Standards (BIS)",
        "source_url": "https://www.bis.gov.in",
        "status": "active",
        "certifications": [
            {
                "name": "BIS Product Certification (ISI Mark)",
                "status": "applicable",
                "note": "DEMO DATA \u2014 ISI mark available but check current mandatory status."
            },
            {
                "name": "CRS (Compulsory Registration Scheme)",
                "status": "not_applicable",
                "note": None
            },
            {
                "name": "Hallmarking",
                "status": "not_applicable",
                "note": None
            }
        ],
        "evidence": {
            "source_document": "IS 3779:1999 \u2014 Stainless Steel Sinks [DEMO DATA]",
            "clause": "Clause 4 \u2014 Material",
            "text": "DEMO EVIDENCE \u2014 replace with verified BIS source text. [Placeholder] Sinks shall be manufactured from austenitic stainless steel of grade 304 or 316 conforming to IS 6911.",
            "source_url": "https://www.bis.gov.in"
        },
        "related_standards": [],
        "is_demo": True,
        "search_text": "stainless steel sink kitchen sink domestic sink SS sink steel sink stainless steel drinking water tank storage tank steel tank water storage",
        "publication_date": "2020-01-01",
        "revision_year": 1999,
        "amendment_count": 0,
        "source_name": "Bureau of Indian Standards",
        "know_your_standard_url": "https://standards.bis.gov.in/",
        "document_url": None,
        "certification_status": "Voluntary",
        "certification_type": None,
        "allied_standards": [],
        "normative_references": [],
        "test_methods": [],
        "safety_standards": [],
        "installation_standards": [],
        "evidence_source": "BIS Portal",
        "last_verified": "2026-09-29T12:00:00Z",
        "data_origin": "DEMO",
        "verification_status": "DEMO",
        "faiss_id": "faiss-std-012"
    }
]

MULTILINGUAL_DEMO_MAPPINGS = {
    "अस्पताल में उपयोग के लिए कॉपर वायर": "hospital grade copper wire",
    "ఆసుపత్రిలో ఉపయోగించే కాపర్ వైర్": "hospital grade copper wire",
    "மருத்துவமனை பயன்பாட்டிற்கான செம்பு கம்பி": "hospital grade copper wire",
    "अस्पताल ग्रेड कॉपर वायर": "hospital grade copper wire",
    "विद्युत केबल": "electrical cable for buildings",
    "स्टेनलेस स्टील टैंक": "stainless steel drinking water tank",
    "सुरक्षा हेलमेट": "safety helmet for industrial workers",
    "पीवीसी पाइप": "PVC pipe water supply",
    "एलईडी बल्ब": "LED light luminaire",
    "स्टील पाइप": "mild steel pipe industrial",
    "హాస్పిటల్ గ్రేడ్ కాపర్ వైర్": "hospital grade copper wire",
    "విద్యుత్ కేబుల్": "electrical cable for buildings",
    "స్టెయిన్‌లెస్ స్టీల్ ట్యాంక్": "stainless steel drinking water tank",
    "భద్రతా శిరస్త్రాణం": "safety helmet for industrial workers"
}
