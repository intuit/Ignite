import React, { Component } from 'react';

const withGlobalConfig = Comp =>
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        searchIndex: window.configuration.searchIndex,
        markdown: window.configuration.markdown,
        plugins: window.configuration.plugins,
        blogHeroImage: null
      };

      window.configuration.setFirstLink = this.setFirstLink.bind(this);
      window.configuration.setSearchIndex = this.setSearchIndex.bind(this);
      window.configuration.setBlogHero = this.setBlogHeader.bind(this);
    }

    setBlogHeader(blogHeroImage) {
      this.setState({ blogHeroImage });
    }

    setSearchIndex(searchIndex) {
      this.setState({ searchIndex });
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
          searchIndex={this.state.searchIndex}
          markdown={this.state.markdown}
          plugins={this.state.plugins}
          blogHero={this.state.blogHeroImage}
        />
      );
    }
  };

export default withGlobalConfig;
