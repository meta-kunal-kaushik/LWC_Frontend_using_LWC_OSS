import { LightningElement, track ,api} from 'lwc';
import { gql } from 'apollo-boost';
import client from 'my/client';


const ALL_LINKS = gql`{
        testField
}
`;
    /*

    async connectedCallback() {
        fetch("http://localhost:3000/graphql" , {
            method: 'POST',
            mod:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            body: JSON.stringify({
                query: `
                query{
                    testField
                  }
                  
                `
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("data - ",data)
            this.links=data.data.testField
        })
}*/

export default class Greeting extends LightningElement {
    @track error = false;
    @track loading = false;
    subscription;
    @track links = [];

    async connectedCallback() {

        const queryOptions = {
            query: ALL_LINKS
        };
        const observable = client.watchQuery(queryOptions);
        this.subscription = observable.subscribe(
            this.observableNextCallback,
            this.observableErrorCallback,
            this.observableCompleteCallback
        );
        this.loading = true;
        try {
            await client.query({query:ALL_LINKS});
            this.loading = false;
        } catch (err) {
            this.loading = false;
        }
    }

    disconnectedCallback() {
        console.log('dis ');
        this.subscription.unsubscribe();
    }

    observableNextCallback = x => {
        console.log('x data ',x);
        this.links = x.data.testField;
        this.error = false;
        console.log(this.links);
    };

    observableErrorCallback = err => {
        console.log('error',err);
        if (!err) return;
        this.error = true;
    };

    observableCompleteCallback = () => {
        window.console.log('Finished');
    };      
}
