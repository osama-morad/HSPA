
import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { } from '@types/googlemaps';

@Component({
    selector: 'AutoCompleteGoogleAddressComponent',
    templateUrl: './autoCompleteGoogleAddress.component.html',
    styleUrls: ['./autoCompleteGoogleAddress.component.css']
})
export class AutoCompleteGoogleAddressComponent implements OnInit, AfterViewInit {
    @Input() adressType: string='geocode';
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'KW' },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        console.log('autoComplete obj' + autocomplete);
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            console.log('Before invoke getAddress');
            this.invokeEvent(place);
        });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

}