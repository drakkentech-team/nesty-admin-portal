import axios from "axios";

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchPrivateMessages = async () => {

    return [
        {
            date: '2024-05-01',
            recipients: ['John Doe', 'Jane Smith'],
            subject: 'Meeting Reminder',
            received: true,
            opened: true,
            messageType: 'Email'
        },
        {
            date: '2024-05-02',
            recipients: ['Alice Johnson'],
            subject: 'Project Update',
            received: true,
            opened: false,
            messageType: 'Email'
        },
        {
            date: '2024-05-03',
            recipients: ['Bob Williams'],
            subject: 'Urgent: Action Required',
            received: true,
            opened: true,
            messageType: 'Email'
        },
        {
            date: '2024-05-04',
            recipients: ['Emily Davis', 'Michael Brown'],
            subject: 'Weekly Newsletter',
            received: true,
            opened: true,
            messageType: 'Newsletter'
        },
        {
            date: '2024-05-05',
            recipients: ['Sam Wilson'],
            subject: 'Invitation to Webinar',
            received: true,
            opened: false,
            messageType: 'Email'
        }
    ];
    /*try {
       const response = await axios.get(`${API_ENDPOINT}/get-mobile-app-users`, {
          headers: {
             'Authorization': `Bearer ${BEARER_TOKEN}`,
             'Content-Type': 'application/json',
             'app-id': 1
          }
       });
       return response.data;
    }
    catch (error) {
       console.error("Error retrieving mobile user data:", error);
       throw error;
    }*/
};


export const sendMessage = async (payload) => {

    console.log('Sending Message')
    try{
        /*await axios.post(`${HOST}/create-web-user`, payload, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
                'app-id': 1
            },

        });*/
        return ("Successfully created admin portal user")
    }
    catch (error) {
        console.error("Error creating admin portal user:", error);
        throw error;
    }
};

