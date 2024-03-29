'use client';
import React, { useState } from 'react';
import { Cliente}  from '../types/Cliente';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import styles from '../styles/clientes.styles.module.css';

function Clientes() {
  const [clientes, setClientes] = useState<{[key:string]:Cliente}>(JSON.parse(localStorage.getItem('clientes') || '{}'));
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      telefone: { value: string };
    };

    const id = uuidv4();
    const dataDeCadastro = new Date().toLocaleDateString();

    const newClientes = {...clientes, [id]: { name, telefone, dataDeCadastro }};
    setClientes(newClientes);
    localStorage.setItem('clientes', JSON.stringify(newClientes));
    setName('');
    setTelefone('');
  }

  return (
    <div className={styles.container}>
      <div>
      <h1 className={styles.h1Center}>Cadastro de novos clientes</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome:</label>
          <input 
          type="text" 
          id="name" 
          name="name" 
          onChange={(e) => setName(e.target.value)}
          value={name}
          required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telefone">Telefone:</label>
          <input
            onChange={(e) => setTelefone(e.target.value)}
            value={telefone}
            type="tel" 
            id="telefone" 
            name="telefone"
            pattern="([0-9]{2})\s([9]{1})?([0-9]{8})"
            placeholder="99 9999-9999"
            title="Número de telefone precisa ser no formato 99 9999-9999"
            required />
        </div>
        <button type="submit" className={styles.submitButton}>Cadastrar</button>
      </form>
      </div>
        <h2>Clientes cadastrados</h2>
      <div className={styles.clientList}>
        <div>
          {Object.entries(clientes).map(([uuid, cliente]) => (
            <div key={uuid}>
              <p>Nome: {cliente.name}</p>
              <p>Telefone: {cliente.telefone}</p>
              <p>Data de cadastro: {cliente.dataDeCadastro}</p>
              <Link href={`/client/${uuid}`}>
                <button className={styles.accessButton}>
                  Acessar conta
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clientes;