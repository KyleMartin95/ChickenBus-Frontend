import * as React from 'react';
import { GoogleMap } from './GoogleMap';
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { SearchBox } from "office-ui-fabric-react/lib/components/SearchBox";
import { PlaceAutocomplete } from "../PlaceAutocomplete/index";
import { IRouteInfoProps } from "../RouteInfo/index";

 export interface IGoogleMap {

}

 export interface IGoogleMapProps extends React.HTMLAttributes<HTMLElement | GoogleMap> {
    /**
     * Optional callback to access the IGoogleMap interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: (component: IGoogleMap) => void;

    /**
     * The optional custom styling to be applied to the GoogleMap component.
     */
    styles?: IGoogleMapStyles;

    /**
     * Array of names of the locations to place corresponding markers on the map. First index corresponds to origin, middle indexes represent stops,
     * and last index represents the destination.
     */
    locationCoords?: google.maps.LatLng[];

    /**
     * Should the map make a call to the backend to find a route to map using the first and last marker locations.
     */
    findRoute?: boolean;

    /**
     * Info to be passed to the map on route creation.
     */
    routeProperties?: IRouteInfoProps;

    /**
     * Callback for when the component renders new locations 
     */
    onDidRenderNewLocations?: (routes?: any[])=>void;
 }

 export interface IGoogleMapStyles {
    root: IStyle;
 }