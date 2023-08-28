import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
 


  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
    ) { }

  ngOnInit(): void {
  }

  cadastrar(form : NgForm){
    if(form.valid){
      this.router.navigate(['./sucesso']);
    }else{
      alert("Formulário não é valido, preencha todos os campos corretamente")
    }
    console.log(form.controls)
  }
  consultaCep(event: any, f: NgForm){
    const cep = event.target.value; 
    if (cep !== '') {
      this.consultaCepService.getConsultaCep(cep).subscribe((resultado )=>
      {
        console.log(resultado);
        this.copulandoEndereco(resultado, f); 

      });
    }
  }
  copulandoEndereco(dados: any, f: NgForm){
    console.log(f)
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf

    })
  }







}
