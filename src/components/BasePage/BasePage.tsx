import {
    IBasePage,
    IBasePageProps,
    IBasePageStyles
} from './BasePage.Props';
import { BaseComponent, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Persona } from 'office-ui-fabric-react/lib/Persona';
import * as React from 'react';
import { HomeContent, SearchContent, EnterGate } from "../index";
import { getStyles } from "./BasePage.styles";
import { examplePersona } from "../../MockData/MockFrontEnd";

interface IBasePageState {
    content: JSX.Element;
}

const styles: IBasePageStyles = getStyles();

export class BasePage extends BaseComponent<IBasePageProps, IBasePageState> {
    constructor(props: IBasePageProps) {
        super(props);
        this.state = {
          content: <SearchContent/>
        }
    }

    public render() {
        return(
            <div style={ styles.root }>
                <div style={ styles.header }>
                    <div style={ styles.logo }>
                        <h2>Place Holder for logo</h2>
                    </div>
                    <div style = {styles.pivot}>
                      <Pivot onLinkClick = {this.onLinkClick}>
                        <PivotItem linkText='Home'/>
                        <PivotItem linkText='Search'/>
                        <PivotItem linkText='Entry Gate'/>
                      </Pivot>
                    </div>
                    <div style={ styles.profile }>
                        <Persona { ...examplePersona} />
                    </div>
                </div>
                <div>
                  {this.state.content}
                </div>
            </div>
        )
    }

    @autobind
    private _getTabId(itemKey: string): string {
        return `NavigationPivot_${itemKey}`;
    }

    @autobind
    private onLinkClick(itemKey: PivotItem): void {
        let content: JSX.Element;
        switch(itemKey.props.linkText){
          case 'Home':
            content = <HomeContent/>
            break;
          case 'Search':
            content = <SearchContent/>
            break;
          case 'Entry Gate':
            content = <EnterGate/>
            break;
        }
        this.setState({content: content})
    }
}
