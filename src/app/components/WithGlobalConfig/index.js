import React from 'react';

export default function withGlobalConfig(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        markdown: window.configuration.markdown,
        plugins: window.configuration.plugins
      };

      window.configuration.setFirstLink = this.setFirstLink.bind(this);
    }

    setFirstLink(pathToMarkdown, firstLink) {
      const oldMarkdown = this.state.markdown;
      const markdown = oldMarkdown.map(m => {
        if (m[0] === pathToMarkdown) {
          m[3] = firstLink;
        }

        return m;
      });

      this.setState({ markdown });
    }

    render() {
      return (
        <Comp
          {...this.props}
          markdown={this.state.markdown}
          plugins={this.state.plugins}
        />
      );
    }
  };
}