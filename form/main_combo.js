// NOTE: The following data (SURCHARGE_DATA) was generated from your CSV file.
        const SURCHARGE_DATA = [
            {
                "code": "FUEL_PERCENT",
                "type": "Fuel surcharge - percentage",
                "description": "Additional charge to cover fuel costs, calculated as a percentage of total shipment cost (base rate + all other surcharges)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_FUEL_PERCENT_percent\">Rate %:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_FUEL_PERCENT_percent\" name=\"rate_FUEL_PERCENT_percent\" placeholder=\"e.g. 10.5\" required>\n                    <span>%</span>\n                </div>\n            </div>\n        "
            },
            {
                "code": "FUEL_FIXED",
                "type": "Fuel surcharge - fixed",
                "description": "Fixed fuel surcharge added to each shipment regardless of shipment value or weight",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_FUEL_FIXED\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_FUEL_FIXED\" name=\"rate_FUEL_FIXED\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_FUEL_FIXED\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_FUEL_FIXED\" name=\"currency_FUEL_FIXED\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "SAD_HANDLING",
                "type": "Single Administrative Document (SAD)",
                "description": "Fee for processing customs documentation (SAD/DUA) required for imports. May vary based on goods value",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_SAD_HANDLING\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_SAD_HANDLING\" name=\"rate_SAD_HANDLING\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_SAD_HANDLING\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_SAD_HANDLING\" name=\"currency_SAD_HANDLING\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "CUSTOMS_FEE",
                "type": "Customs fee",
                "description": "Government-imposed charges including customs duties, import taxes (VAT/GST), excise duties, and regulatory fees",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"zone_country_CUSTOMS_FEE\">Zone/Country:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"zone_country_CUSTOMS_FEE\" name=\"zone_country_CUSTOMS_FEE\" placeholder=\"e.g. ZONE_A, REMOTE_ZONE_1\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"rate_CUSTOMS_FEE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_CUSTOMS_FEE\" name=\"rate_CUSTOMS_FEE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_CUSTOMS_FEE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_CUSTOMS_FEE\" name=\"currency_CUSTOMS_FEE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "CUSTOMS_CLEARANCE",
                "type": "Customs clearance fee",
                "description": "Service charge for handling the administrative customs clearance process: preparing declarations, communicating with authorities, ensuring regulatory compliance",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_CUSTOMS_CLEARANCE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_CUSTOMS_CLEARANCE\" name=\"rate_CUSTOMS_CLEARANCE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_CUSTOMS_CLEARANCE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_CUSTOMS_CLEARANCE\" name=\"currency_CUSTOMS_CLEARANCE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "PEAK_FEE",
                "type": "Peak season fee",
                "description": "Additional charge during high-demand periods (e.g., holidays). Only applies to shipments with label dates within the defined peak period",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_PEAK_FEE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_PEAK_FEE\" name=\"rate_PEAK_FEE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_PEAK_FEE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_PEAK_FEE\" name=\"currency_PEAK_FEE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "SECURITY_INTL",
                "type": "Security fee - international",
                "description": "Additional security, insurance, and safety charges for cross-border international shipments",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_SECURITY_INTL\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_SECURITY_INTL\" name=\"rate_SECURITY_INTL\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_SECURITY_INTL\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_SECURITY_INTL\" name=\"currency_SECURITY_INTL\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "SECURITY_ZONE",
                "type": "Security fee - zone specific",
                "description": "Additional security, insurance, and safety charges for shipments to specific zones with enhanced security requirements",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"zone_country_SECURITY_ZONE\">Zone/Country:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"zone_country_SECURITY_ZONE\" name=\"zone_country_SECURITY_ZONE\" placeholder=\"e.g. ZONE_A, REMOTE_ZONE_1\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"rate_SECURITY_ZONE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_SECURITY_ZONE\" name=\"rate_SECURITY_ZONE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_SECURITY_ZONE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_SECURITY_ZONE\" name=\"currency_SECURITY_ZONE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "LOCATION_FEE",
                "type": "Location fee",
                "description": "Additional delivery charge for shipments to specific locations (zone can contain countries, postcodes, or any geographic definition)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"zone_country_LOCATION_FEE\">Zone/Country:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"zone_country_LOCATION_FEE\" name=\"zone_country_LOCATION_FEE\" placeholder=\"e.g. ZONE_A, REMOTE_ZONE_1\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"rate_LOCATION_FEE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_LOCATION_FEE\" name=\"rate_LOCATION_FEE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_LOCATION_FEE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_LOCATION_FEE\" name=\"currency_LOCATION_FEE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "REMOTE_DELIVERY",
                "type": "Remote area delivery",
                "description": "Surcharge for deliveries to remote or hard-to-reach areas. Applied when sender or receiver postcode matches the remote zone list",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"zone_country_REMOTE_DELIVERY\">Zone/Country:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"zone_country_REMOTE_DELIVERY\" name=\"zone_country_REMOTE_DELIVERY\" placeholder=\"e.g. ZONE_A, REMOTE_ZONE_1\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"rate_REMOTE_DELIVERY\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_REMOTE_DELIVERY\" name=\"rate_REMOTE_DELIVERY\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_REMOTE_DELIVERY\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_REMOTE_DELIVERY\" name=\"currency_REMOTE_DELIVERY\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "OUT_OF_AREA_PICKUP",
                "type": "Out of area pickup",
                "description": "Surcharge for pickups from remote or out-of-coverage areas. Applied based on ship_from postcode",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"zone_country_OUT_OF_AREA_PICKUP\">Zone/Country:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"zone_country_OUT_OF_AREA_PICKUP\" name=\"zone_country_OUT_OF_AREA_PICKUP\" placeholder=\"e.g. ZONE_A, REMOTE_ZONE_1\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"rate_OUT_OF_AREA_PICKUP\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_OUT_OF_AREA_PICKUP\" name=\"rate_OUT_OF_AREA_PICKUP\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_OUT_OF_AREA_PICKUP\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_OUT_OF_AREA_PICKUP\" name=\"currency_OUT_OF_AREA_PICKUP\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "LONDON_CONGESTION",
                "type": "London congestion",
                "description": "Additional fee for deliveries to central London to cover congestion charge and ULEZ costs",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"zone_country_LONDON_CONGESTION\">Zone/Country:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"zone_country_LONDON_CONGESTION\" name=\"zone_country_LONDON_CONGESTION\" placeholder=\"e.g. ZONE_A, REMOTE_ZONE_1\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"rate_LONDON_CONGESTION\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_LONDON_CONGESTION\" name=\"rate_LONDON_CONGESTION\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_LONDON_CONGESTION\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_LONDON_CONGESTION\" name=\"currency_LONDON_CONGESTION\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "ROAD_TOLL",
                "type": "Road toll fee",
                "description": "Additional charge to cover costs of using toll roads including highways, bridges, tunnels, or other paid infrastructure",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_ROAD_TOLL\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_ROAD_TOLL\" name=\"rate_ROAD_TOLL\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_ROAD_TOLL\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_ROAD_TOLL\" name=\"currency_ROAD_TOLL\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "CONFIRMATION_NONE",
                "type": "Confirmation - None",
                "description": "Fee when NO delivery confirmation is required (some carriers include default confirmation, opting out may incur a charge)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_CONFIRMATION_NONE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_CONFIRMATION_NONE\" name=\"rate_CONFIRMATION_NONE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_CONFIRMATION_NONE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_CONFIRMATION_NONE\" name=\"currency_CONFIRMATION_NONE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "CONFIRMATION_DELIVERY",
                "type": "Confirmation - Delivery",
                "description": "Fee for basic delivery confirmation (proof that package was delivered)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_CONFIRMATION_DELIVERY\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_CONFIRMATION_DELIVERY\" name=\"rate_CONFIRMATION_DELIVERY\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_CONFIRMATION_DELIVERY\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_CONFIRMATION_DELIVERY\" name=\"currency_CONFIRMATION_DELIVERY\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "CONFIRMATION_SIGNATURE",
                "type": "Confirmation - Signature",
                "description": "Fee for requiring recipient signature upon delivery",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_CONFIRMATION_SIGNATURE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_CONFIRMATION_SIGNATURE\" name=\"rate_CONFIRMATION_SIGNATURE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_CONFIRMATION_SIGNATURE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_CONFIRMATION_SIGNATURE\" name=\"currency_CONFIRMATION_SIGNATURE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "CONFIRMATION_ADULT",
                "type": "Confirmation - Adult Signature",
                "description": "Fee for requiring an adult signature (18+) with age verification",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_CONFIRMATION_ADULT\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_CONFIRMATION_ADULT\" name=\"rate_CONFIRMATION_ADULT\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_CONFIRMATION_ADULT\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_CONFIRMATION_ADULT\" name=\"currency_CONFIRMATION_ADULT\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "HAL",
                "type": "Hold at location (HAL)",
                "description": "Fee for holding a package at a carrier facility or designated location for customer pickup",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_HAL\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_HAL\" name=\"rate_HAL\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_HAL\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_HAL\" name=\"currency_HAL\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "POD",
                "type": "Proof of delivery (POD)",
                "description": "Fee for providing a copy of the delivery record, typically including recipient signature (if available) and time/date",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_POD\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_POD\" name=\"rate_POD\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_POD\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_POD\" name=\"currency_POD\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "APPOINTMENT_DELIVERY",
                "type": "Appointment delivery",
                "description": "Fee for scheduling a specific delivery time or window (appointment) with the recipient",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_APPOINTMENT_DELIVERY\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_APPOINTMENT_DELIVERY\" name=\"rate_APPOINTMENT_DELIVERY\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_APPOINTMENT_DELIVERY\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_APPOINTMENT_DELIVERY\" name=\"currency_APPOINTMENT_DELIVERY\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "RESIDENTIAL",
                "type": "Residential surcharge",
                "description": "Additional fee for deliveries to a residential (non-commercial) address",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_RESIDENTIAL\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_RESIDENTIAL\" name=\"rate_RESIDENTIAL\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_RESIDENTIAL\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_RESIDENTIAL\" name=\"currency_RESIDENTIAL\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "COMMERCIAL",
                "type": "Commercial surcharge",
                "description": "Additional fee for deliveries to a commercial (business) address (Less common, but used by some carriers)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_COMMERCIAL\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_COMMERCIAL\" name=\"rate_COMMERCIAL\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_COMMERCIAL\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_COMMERCIAL\" name=\"currency_COMMERCIAL\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "LIMITED_ACCESS",
                "type": "Limited Access Delivery",
                "description": "Surcharge for deliveries to locations with limited access or special security/entry requirements (e.g., military bases, prisons, restricted construction sites)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_LIMITED_ACCESS\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_LIMITED_ACCESS\" name=\"rate_LIMITED_ACCESS\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_LIMITED_ACCESS\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_LIMITED_ACCESS\" name=\"currency_LIMITED_ACCESS\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "INSIDE_DELIVERY",
                "type": "Inside Delivery",
                "description": "Fee for delivering the package beyond the front door (e.g., inside the building, to a specific office/room)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_INSIDE_DELIVERY\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_INSIDE_DELIVERY\" name=\"rate_INSIDE_DELIVERY\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_INSIDE_DELIVERY\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_INSIDE_DELIVERY\" name=\"currency_INSIDE_DELIVERY\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "LIFTGATE",
                "type": "Liftgate delivery/pickup",
                "description": "Fee for use of a liftgate (hydraulic platform) during pickup or delivery, necessary when a dock is not available (typically LTL/freight)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_LIFTGATE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_LIFTGATE\" name=\"rate_LIFTGATE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_LIFTGATE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_LIFTGATE\" name=\"currency_LIFTGATE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "COD",
                "type": "COD (Cash on Delivery)",
                "description": "Fee for handling and remitting cash collected from the recipient at the time of delivery",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_COD\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_COD\" name=\"rate_COD\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_COD\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_COD\" name=\"currency_COD\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "DANGEROUS_GOODS",
                "type": "Dangerous goods",
                "description": "Fee for shipping items classified as dangerous goods (batteries, chemicals, flammable items, etc.). Requires special handling, labeling, and documentation",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_DANGEROUS_GOODS\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_DANGEROUS_GOODS\" name=\"rate_DANGEROUS_GOODS\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_DANGEROUS_GOODS\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_DANGEROUS_GOODS\" name=\"currency_DANGEROUS_GOODS\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "THIRD_PARTY_BILLING",
                "type": "Third party billing",
                "description": "Fee when shipping charges are billed to third party (not sender or receiver). Covers additional administrative processing",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_THIRD_PARTY_BILLING\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_THIRD_PARTY_BILLING\" name=\"rate_THIRD_PARTY_BILLING\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_THIRD_PARTY_BILLING\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_THIRD_PARTY_BILLING\" name=\"currency_THIRD_PARTY_BILLING\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "ADDITIONAL_DOCS",
                "type": "Additional documentation",
                "description": "Fee for additional documentation requirements beyond standard (commercial invoice, certificates of origin, etc.). Common in international shipping",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_ADDITIONAL_DOCS\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_ADDITIONAL_DOCS\" name=\"rate_ADDITIONAL_DOCS\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_ADDITIONAL_DOCS\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_ADDITIONAL_DOCS\" name=\"currency_ADDITIONAL_DOCS\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "OVERSIZE_1",
                "type": "Oversize package 1",
                "description": "Surcharge for packages exceeding standard size limits (e.g., length greater than 150cm, or length plus girth greater than 250cm). Calculated based on the first size threshold.",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_OVERSIZE_1\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_OVERSIZE_1\" name=\"rate_OVERSIZE_1\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_OVERSIZE_1\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_OVERSIZE_1\" name=\"currency_OVERSIZE_1\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "OVERSIZE_2",
                "type": "Oversize package 2",
                "description": "Surcharge for packages exceeding the second, larger size threshold (e.g., length greater than 200cm, or length plus girth greater than 300cm). Applied when the package is larger than the first threshold.",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_OVERSIZE_2\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_OVERSIZE_2\" name=\"rate_OVERSIZE_2\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_OVERSIZE_2\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_OVERSIZE_2\" name=\"currency_OVERSIZE_2\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "ADDITIONAL_HANDLING",
                "type": "Additional handling - size/packaging",
                "description": "Fee for packages requiring additional manual handling due to shape (e.g., cylinder), unstable packaging, or excessive size/weight that disqualifies it from automated sorting.",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_ADDITIONAL_HANDLING\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_ADDITIONAL_HANDLING\" name=\"rate_ADDITIONAL_HANDLING\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_ADDITIONAL_HANDLING\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_ADDITIONAL_HANDLING\" name=\"currency_ADDITIONAL_HANDLING\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "OOG",
                "type": "Out-of-gauge (OOG)",
                "description": "Fee for shipments that exceed the maximum size or weight limits, often requiring special transport or handling (typically for LTL/freight)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_OOG\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_OOG\" name=\"rate_OOG\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_OOG\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_OOG\" name=\"currency_OOG\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "EXCESSIVE_LENGTH",
                "type": "Excessive length",
                "description": "Fee specifically applied to items exceeding a certain length threshold (e.g., >250cm), but may not be an OOG if other dimensions are small.",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_EXCESSIVE_LENGTH\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_EXCESSIVE_LENGTH\" name=\"rate_EXCESSIVE_LENGTH\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_EXCESSIVE_LENGTH\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_EXCESSIVE_LENGTH\" name=\"currency_EXCESSIVE_LENGTH\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "NON_STACKABLE",
                "type": "Stackable surcharge",
                "description": "Fee (or discount) applied if the shipment (usually palletized) is non-stackable. This field allows for a fee for non-stackable status.",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_NON_STACKABLE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_NON_STACKABLE\" name=\"rate_NON_STACKABLE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_NON_STACKABLE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_NON_STACKABLE\" name=\"currency_NON_STACKABLE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "SATURDAY_SERVICE",
                "type": "Saturday delivery/pickup",
                "description": "Fee for a special Saturday delivery or pickup request",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_SATURDAY_SERVICE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_SATURDAY_SERVICE\" name=\"rate_SATURDAY_SERVICE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_SATURDAY_SERVICE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_SATURDAY_SERVICE\" name=\"currency_SATURDAY_SERVICE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "EVENING_SERVICE",
                "type": "Evening delivery/pickup",
                "description": "Fee for a special evening time slot for delivery or pickup",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_EVENING_SERVICE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_EVENING_SERVICE\" name=\"rate_EVENING_SERVICE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_EVENING_SERVICE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_EVENING_SERVICE\" name=\"currency_EVENING_SERVICE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "SPECIFIC_DATE",
                "type": "Delivery on specific date",
                "description": "Fee for requesting guaranteed delivery on a specific, non-standard date (excluding next-day or standard transit time)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_SPECIFIC_DATE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_SPECIFIC_DATE\" name=\"rate_SPECIFIC_DATE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_SPECIFIC_DATE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_SPECIFIC_DATE\" name=\"currency_SPECIFIC_DATE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "WEEKEND_SERVICE",
                "type": "Weekend service (other than Saturday)",
                "description": "Fee for Sunday or Public Holiday service (delivery or pickup)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_WEEKEND_SERVICE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_WEEKEND_SERVICE\" name=\"rate_WEEKEND_SERVICE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_WEEKEND_SERVICE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_WEEKEND_SERVICE\" name=\"currency_WEEKEND_SERVICE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "TRANSIT_GUARANTEE",
                "type": "Transit time guarantee",
                "description": "Fee to guarantee the transit time, often refundable if the transit time is not met (service level downgrade/change)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_TRANSIT_GUARANTEE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_TRANSIT_GUARANTEE\" name=\"rate_TRANSIT_GUARANTEE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_TRANSIT_GUARANTEE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_TRANSIT_GUARANTEE\" name=\"currency_TRANSIT_GUARANTEE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "INSURANCE",
                "type": "Carrier insurance",
                "description": "Fee for utilizing the carrier's in-house insurance (based on goods value)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_INSURANCE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_INSURANCE\" name=\"rate_INSURANCE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_INSURANCE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_INSURANCE\" name=\"currency_INSURANCE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "SERVICE_CHANGE",
                "type": "Change of service",
                "description": "Fee for changing the requested service after shipment is booked (e.g., upgrading from standard to express)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_SERVICE_CHANGE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_SERVICE_CHANGE\" name=\"rate_SERVICE_CHANGE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_SERVICE_CHANGE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_SERVICE_CHANGE\" name=\"currency_SERVICE_CHANGE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            },
            {
                "code": "RETURN_FEE",
                "type": "Return to sender (RTS) fee",
                "description": "Fee for shipments that fail delivery and must be returned to the original sender (often a percentage of the original rate or a flat fee)",
                "html": "\n            <div class=\"input-group\">\n                <label for=\"rate_RETURN_FEE\">Rate:</label>\n                <div class=\"input-field\">\n                    <input type=\"number\" id=\"rate_RETURN_FEE\" name=\"rate_RETURN_FEE\" placeholder=\"e.g. 5.00\" required>\n                </div>\n            </div>\n        \n            <div class=\"input-group\">\n                <label for=\"currency_RETURN_FEE\">Currency:</label>\n                <div class=\"input-field\">\n                    <input type=\"text\" id=\"currency_RETURN_FEE\" name=\"currency_RETURN_FEE\" placeholder=\"e.g. EUR\" required>\n                </div>\n            </div>\n        "
            }
        ];

        // Definition of which charges apply to each service (EXAMPLE)
        // You must adjust this list of codes (e.g. 'FUEL_PERCENT') to your actual services!
        const SERVICE_MAP = {
            'COMMON': SURCHARGE_DATA.map(d => d.code), // COMMON shows all 30 charges
            'EXPRESS': [
                'FUEL_PERCENT', 'FUEL_FIXED', 'CUSTOMS_CLEARANCE', 'PEAK_FEE', 'SECURITY_INTL',
                'REMOTE_DELIVERY', 'OUT_OF_AREA_PICKUP', 'CONFIRMATION_DELIVERY', 'CONFIRMATION_SIGNATURE', 'CONFIRMATION_ADULT',
                'HAL', 'POD', 'APPOINTMENT_DELIVERY', 'RESIDENTIAL', 'COMMERCIAL', 'INSURANCE'
            ],
            'STANDARD': [
                'FUEL_PERCENT', 'SAD_HANDLING', 'CUSTOMS_FEE', 'LOCATION_FEE', 'RESIDENTIAL', 'COMMERCIAL',
                'INSIDE_DELIVERY', 'LIFTGATE', 'COD', 'THIRD_PARTY_BILLING', 'RETURN_FEE', 'SATURDAY_SERVICE', 'EVENING_SERVICE',
                'SPECIFIC_DATE', 'WEEKEND_SERVICE'
            ],
            'FREIGHT': [
                'DANGEROUS_GOODS', 'OVERSIZE_1', 'OVERSIZE_2', 'ADDITIONAL_HANDLING', 'OOG',
                'EXCESSIVE_LENGTH', 'NON_STACKABLE', 'LIFTGATE', 'INSIDE_DELIVERY', 'LIMITED_ACCESS',
                'THIRD_PARTY_BILLING', 'ADDITIONAL_DOCS', 'INSURANCE'
            ]
        };
        
        // Function to generate table row from data
        function createRow(surcharge) {
            return `
                <tr>
                    <td><strong>${surcharge.type}</strong></td>
                    <td class="description">${surcharge.description}</td>
                    <td>${surcharge.html}</td>
                </tr>
            `;
        }

        // Function to filter and render form
        function renderForm(serviceKey) {
            const tableBody = document.getElementById('surchargeTableBody');
            const surchargeCodes = SERVICE_MAP[serviceKey] || [];
            let htmlContent = '';

            // Filter charges to be displayed for the given service
            const filteredSurcharges = SURCHARGE_DATA.filter(s => surchargeCodes.includes(s.code));
            
            if (filteredSurcharges.length === 0) {
                htmlContent = `<tr><td colspan="3" style="text-align: center; color: #dc3545; font-weight: bold;">No additional charges to fill out for the selected service.</td></tr>`;
            } else {
                filteredSurcharges.forEach(surcharge => {
                    htmlContent += createRow(surcharge);
                });
            }

            tableBody.innerHTML = htmlContent;
        }

        // Initialization: Set up listener for combobox change
        document.addEventListener('DOMContentLoaded', () => {
            const selector = document.getElementById('serviceSelector');
            selector.addEventListener('change', (event) => {
                renderForm(event.target.value);
            });

            // Render form for default 'COMMON' value after loading
            renderForm('COMMON');
        });