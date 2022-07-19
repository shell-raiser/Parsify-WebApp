var fs = require('fs');


fs.readFile("/workspace/Parsify-WebApp/extractedText.txt", "utf8", function (error, data) {
    if (error) { console.error("Error: " + error); }
    console.log("saved")
    const theString = data;

    let dist_name = theString.substring(theString.search('District') + 'District'.length, theString.search('Police Station'))

    let police_station = theString.substring(theString.search('Police Station') + 'Police Station'.length, theString.indexOf('FIR', 10) - 5)

    let fir_date = theString.substring(theString.search('Date') + 'Date '.length, theString.search('Date') + "07/04/2019".length + 'Date '.length)

    let fir_no = theString.substring(theString.search('FIR No.') + 'FIR No.'.length, theString.search('Date'))

    let accused_name_1 = theString.substring(theString.search('Accused Name') + 'Accused Name'.length, theString.search('Age'))
    let act = theString.substring(theString.search('Act') + 'Act'.length, theString.search('Sections'))

    let complaint_informan_father_husband_name = theString.substring(theString.search("Father's/") + "Father's/".length, theString.search("Father's/") + "Father's/".length + 20)
    // let complaint_informan_father_husband_name = theString.substring(theString.search("Father's/")+"Father's/".length,theString.search('\('))
    let Name = theString.indexOf("Name")
    console.log(Name)
    let complaint_informan_name = theString.substring(theString.indexOf("Name ASI", 1000) + 'Name ASI'.length, theString.search('Name ASI') + 'Name ASI'.length + 11)


    let complaint_informan_nationality = theString.substring(theString.search('Nationality') + 'Nationality'.length, theString.search('Nationality') + 'Nationality'.length + 8)

    let date = theString.substring(theString.search('Date') + 'Date'.length, theString.search('Date') + 'Date'.length + 11)

    let details_address_1 = theString.substring(theString.search('Address') + 'Address'.length, theString.search('Address') + 'Address'.length + 50)
    let dist_name_pdf = theString.substring(theString.search('District') + 'District'.length, theString.search('Police Station'))



    let occupation = theString.substring(theString.search('Occupatio') + 'Occupatio'.length, theString.indexOf('Address', 1200))


    let occurrence_of_offence_date_from = theString.substring(theString.search('Date from ') + 'Date from '.length, theString.search('Date to ') + "07/04/2019".length + 'Date to '.length)
    let occurrence_of_offence_time_from = theString.substring(theString.search('Time from'), theString.search('Time to') + 'Time from'.length, theString.search('Informatior received at PS'))
    let occurrence_of_offence_date_to = theString.substring(theString.search('Time to') + 'Time to'.length, theString.search('Informatior received at PS'))
    let occurrence_of_offence_time_period = theString.substring(theString.search('Time Period') + " ", theString.search('Time from'))
    let occurrence_of_offence_time_to = theString.substring(theString.search('Time to') + 'Time to'.length, theString.search('Time to') + "19:10".length + 'Time to'.length)


    let place_of_occurrence_name_of_police_station_org = theString.substring(theString.search('Name of P.S. District') + 'Name of P.S. District'.length, theString.search('Complainan/Informan'))


    let sections = theString.substring(theString.search('Sections') + 'Sections'.length, theString.search('Sections') + 'Sections'.length + 13)


    let year = date.substring(date.length - 4);

    let op = {
        "dist_name": dist_name,
        "police_station": police_station,
        "fir_date": fir_date,
        "fir_no": fir_no,
        "state": "",
        "accused_name_1": accused_name_1,
        "act": act,
        "complaint_informan_father_husband_name": complaint_informan_father_husband_name,
        "complaint_informan_name": complaint_informan_name,
        "complaint_informan_nationality": complaint_informan_nationality,
        "date": date,
        "details_address_1": details_address_1,
        "dist_name_pdf": dist_name,
        "occupation": occupation,
        "occurrence_of_offence_date_from": occurrence_of_offence_date_from,
        "occurrence_of_offence_time_from": occurrence_of_offence_time_from,
        "occurrence_of_offence_date_to": occurrence_of_offence_date_to,
        "occurrence_of_offence_time_period": occurrence_of_offence_time_period,
        "occurrence_of_offence_time_to": occurrence_of_offence_time_to,
        "place_of_occurrence_name_of_police_station_org": place_of_occurrence_name_of_police_station_org,
        "sections": sections,
        "year": year
    }
    console.log(op)
    // console.log(theString)

});




