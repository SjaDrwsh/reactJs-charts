import classnames from 'classnames';
import React from 'react';
import { ReadApiState } from './ReadApiState';
import { Observer } from 'mobx-react';
import { Loader } from 'semantic-ui-react';

type ReadApiStateContextProps<
  T,
  E extends { message: string },
  P extends any[]
> = {
  /**
   * The state to observe and show either loading, error or data for
   */
  state: ReadApiState<T, E, P>;

  /**
   * Render the components that need the actual data
   * Here the data and all depended data is guaranteed to be fully loaded and defined
   * @param data
   */
  children: (data: T) => React.ReactNode;
};

type Props<T, E extends { message: string }, P extends any[]> =
  ReadApiStateContextProps<T, E, P>;

/**
 * Helper HOC to be used with ApiState
 * Handles Loading and error cases and render the child components only after the data is fully defined
 */
export class ReadApiStateContext<
  T,
  E extends { message: string },
  P extends any[]
> extends React.Component<Props<T, E, P>> {
  private lastChildren: React.ReactNode = undefined;

  render(): React.ReactNode {
    return (
      /** Important !!!
       *  Use here the Observer and not the @observer class decorator
       *  The Hot module reloading (HMR) does not work together with the decorator class syntax!
       */
      <Observer>
        {() => {
          const props = this.props;

          const { data } = props.state;

          let { error, isLoading } = props.state;

          if (error) {
            return <p className="error-wrapper">{error.message}</p>;
          }

          if (isLoading || data === undefined) {
            if (this.lastChildren !== undefined) {
              return (
                <div className={classnames('loaderWrapper', 'isLoading')}>
                  {this.lastChildren}
                </div>
              );
            }

            return <Loader active size="small" inline />;
          }

          this.lastChildren = props.children(data);

          return (
            <div className={classnames('loaderWrapper')}>
              {this.lastChildren}
            </div>
          );
        }}
      </Observer>
    );
  }
}
