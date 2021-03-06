var Styleguide = React.createClass({
  render: function(){
    return (
      <main>
        <section>
          <h3>Text input</h3>
          <Gnocchi.Text/>
          <Gnocchi.Text required={true} counter='subtract' counterMax={10}/>
        </section>

        <section>
          <h3>Textarea</h3>
          <Gnocchi.Textarea/>
        </section>

        <section>
          <h3>Number input</h3>
          <Gnocchi.Number/>
          <Gnocchi.Number min={0} max={5} placeholder='0 to 5'/>
          <Gnocchi.Number float={true} placeholder='#.#'/>
        </section>

        <section>
          <h3>Select</h3>
          <Gnocchi.Select
            options={[
              {value: 123, label: 'dasdsadsadasdsa'},
              {value: 'sswws', label: 1234567890},
              'sffffffff',
              1234]}/>
          <Gnocchi.Select
            placeholder='Select something (or not)'
            empty='empty label'
            options={[1,2,3]}/>
        </section>

        <section>
          <h3>Checkbox</h3>
          <Gnocchi.Check label='Check me'/>
        </section>

        <section>
          <h3>Button</h3>
          <Gnocchi.Button label='Default'/>
          <Gnocchi.Button label='With icon' icon='arrow-right'/>
          <Gnocchi.Button label='Action' classes='action'/>
          <Gnocchi.Button label='Highlight' classes='highlight'/>
          <Gnocchi.Button label='Lowlight' classes='lowlight'/>
          <Gnocchi.Button label='Fit' classes='fit'/>
          <Gnocchi.Button label='Link' classes='fit' link='http://google.com'/>
        </section>
      </main>
    );
  }
});

ReactDOM.render(<Styleguide/>, document.getElementById('main'));
