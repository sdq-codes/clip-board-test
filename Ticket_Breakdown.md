# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

###Ticket No.1 - Create a new database schema (facility_agents) that shows the relationship between a facility and an agent by storing the custom-id given to the agent by the facility.

The schema gets populated anytime an agent is booked for the first time by a facility

Schema should contain:-
- id: type-uuid //primary key
- agent_id: type=uuid //foreign key to agents table
- facility_id: type=uuid //foreign key to facilities table
- custom_agent_id: type=string //custom id given to agent by facility (if left blank by the facility the system should auto generate one)
- created_at: datetime
- updated_at: datetime

Implementation details: - create migration resources/file and update the database via auto-migrate or pipeline
Time:- 1 hours

###Ticket No.2 - Update the postAgentToFacility function to accommodate the new requirement

Implementation details: - The function should first validate if there is an record in the facility_agents table that has a record containing the agent_id and facility id, if there is no such record the postAgentToFacility must now accept the custom_agent_id details sent by the facility and if it is not sent the function should auto generate one.

Time:- 3 hours


###Ticket No.3 - Update getShiftsByFacility to also return custom_agent_id

Implementation details: - Update getShiftsByFacility to also return custom_agent_id as part of the meta data being returned

Time:- 1 hours


###Ticket No.4 - Create a function sumShiftsByCustomId that extends the getShiftsByFacility function and helps group all the shifts gotten by shift custom_agent_id

Implementation details: - The function should call the getShiftsByFacility function and then group all the data gotten by custom_agent_id and also add a new field call total shifts per quarter which is a sum of all shifts done by that agent for the facility that quarter 

Time:- 3 hours


###Ticket No.5 - generateReport function should use the function sumShiftsByCustomId

Implementation details: - The function generateReport should call the sumShiftsByCustomId function and then use the data returned to generate pdf 

Time:- 3 hours
