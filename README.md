# genea-webhook-client-sample

Genea Access Control Webhook Client Sample Project in Node JS.

This project can be used as a boilerplate for the code to handle the webhook notifications

## Building an endpoint

- To get started, you will have to create your own custom endpoint, similar to any other endpoint in your application
- For every Audit and Access event in Genea Access Control, a `POST` request will be made to the endpoint created and configured by you
- We must receive a `2xx` status code for each webhook notification, if not, it will be assumed that the notification was not received and will attempt to retry
- Maximum retry attempts are currently set to a count of 3 at an interval of 10s


## Configuration

### Web Portal
Please refer our help article for setting up webhooks on our web portal:
https://help.getgenea.com/en/articles/1292571-genea-events-webhook

### APIs

- Generate Webhook Secret
API Documentation: https://apidocs-accesscontrol.getgenea.com/?version=bb49bbc2-6c95-42c0-be65-2bdd85e9f072#506d1b48-102b-41bb-afac-0f2003c983d9

- Subscribe Webhook
API Documentation: https://apidocs-accesscontrol.getgenea.com/?version=bb49bbc2-6c95-42c0-be65-2bdd85e9f072#a744f918-c92f-4897-8e5b-0edd20e3fbad

- Get Webhook
API Documentation: https://apidocs-accesscontrol.getgenea.com/?version=bb49bbc2-6c95-42c0-be65-2bdd85e9f072#d4884592-fd8d-417a-b188-7dbcc00e5b9c

- Update Webhook
API Documentation: https://apidocs-accesscontrol.getgenea.com/?version=bb49bbc2-6c95-42c0-be65-2bdd85e9f072#f0370c37-7ea2-4443-87d5-600f588123a5

- Unsubscribe Webhook
API Documentation: https://apidocs-accesscontrol.getgenea.com/?version=bb49bbc2-6c95-42c0-be65-2bdd85e9f072#5869afbd-8c45-4a29-a919-948c5ef57412


## Sample Payload

### Access Event

```
{
    "uuid": "5fd0aad3d64a99000414d61e",
    "event_time": "2020-12-09T10:45:38.000Z",
    "event_type": "ACCESS",
    "event_action": "SEQUR_ACCESS_GRANTED",
    "event_message": "Access Granted",
    "event_note": null,
    "actor": {
        "type": "USER",
        "user_location_uuid": "c2ab5ccb-c770-4738-b259-8724f224dbec",
        "user_location_role": "USER",
        "user_uuid": "fc82ca24-123a-4f4c-8c0b-577000b15e53",
        "user_name": "Bob The builder",
        "user_email": "bob@grr.la",
        "user_avatar_url": "https://picsum.photos/200/300"
    },
    "location": {
        "uuid": "ce0ad974-7d4d-42a4-af09-8724f224dbec",
        "name": "Genea",
        "address_line1": "6655 Tulip Garden Way, Alpharetta, GA 30004, USA",
        "address_line2": "Suite 108",
        "city": "Alpharetta",
        "state": "GA",
        "zip": "30004",
        "phone": null,
        "timezone": "America/New_York",
        "latitude": 21.2741,
        "longitude": 72.9647
    },
    "controller": {
        "uuid": "6ab78574-2e6d-46c1-abdc-577000b15e53",
        "name": "00:0F:E5:0B:A5:4E",
        "mac": "00:0f:e5:0b:a5:4e",
        "model": "LP1502",
        "status": "OFFLINE"
    },
    "card": {
        "uuid": "c5fcbcb3-d572-4443-8f7e-577000b15e53",
        "type": "KEYCARD",
        "status": "ACTIVE",
        "card_number": "12006465125",
        "start_date": "2020-12-08T11:33:19.000Z",
        "end_date": null
    },
    "created_at": "2020-12-09T10:45:39.346Z"
}
```

### Audit Event

```
{
    "uuid": "12722658",
    "event_time": "2021-01-28T10:46:56.804Z",
    "event_type": "AUDIT",
    "event_action": "CREATED",
    "event_message": "Created Card 1111 for Aaron Arnold",
    "event_note": null,
    "event_hw_info": null,
    "location": {
        "uuid": "ce0ad974-7d4d-42a4-af09-8724f224dbec",
        "name": "Genea",
        "address_line1": "6655 Tulip Garden Way, Alpharetta, GA 30004, USA",
        "address_line2": "Suite 108",
        "city": "Alpharetta",
        "state": "GA",
        "zip": "30004",
        "phone": null,
        "timezone": "America/New_York",
        "latitude": 21.2741,
        "longitude": 72.9647
    },
    "actor": {
        "type": "PERSON",
        "user_location_uuid": "8d4167c0-c827-46d0-84ed-8724f224dbec",
        "user_location_role": "ADMIN",
        "user_uuid": "e48d7bbe-cca1-43ef-b48e-577000b15e53",
        "user_name": "Bob The builder",
        "user_email": "bob@grr.la",
        "user_avatar_url": "https://picsum.photos/200/300"
    },
    "created_at": "2021-01-28T10:46:57.880Z",
    "audit_resource": {
        "id": null,
        "uuid": "e48d7bbe-3c8e-4382-94f1-ac5481b4a0e3",
        "name": "1111",
        "type": "CARD"
    }
}
```
