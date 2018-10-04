<?php
	$cluster = Cassandra::cluster()
        ->withContactPoints('172.23.99.106','172.23.99.180') // cassandra address 
        ->withPort(9042)
        ->build();
    $keyspace = 'foodmaker'; // keyspace
    $session = $cluster->connect($keyspace);
?>