<practice>
  <p>こんにちは　{name}さん</p>
  <a href="_blank" onClick={changeName}>クリック</a>
  <script>
    this.firstname = opts.firstname;
    this.lastname = opts.lastname;
    this.name = this.lastname;
    this.changeName = (e) => {
      e.preventDefault();
      this.name = this.firstname;
    }
  </script>
</practice>
