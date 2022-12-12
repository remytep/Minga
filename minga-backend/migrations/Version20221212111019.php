<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221212111019 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sku DROP FOREIGN KEY FK_F9038C4EBDCCF9B');
        $this->addSql('ALTER TABLE product_option_value DROP FOREIGN KEY FK_A938C7374584665A');
        $this->addSql('ALTER TABLE product_option_value DROP FOREIGN KEY FK_A938C737C964ABE2');
        $this->addSql('DROP TABLE product_option_value');
        $this->addSql('DROP INDEX IDX_F9038C4EBDCCF9B ON sku');
        $this->addSql('ALTER TABLE sku ADD product_option_id INT NOT NULL, ADD option_value VARCHAR(255) NOT NULL, CHANGE product_option_value_id product_id INT NOT NULL');
        $this->addSql('ALTER TABLE sku ADD CONSTRAINT FK_F9038C44584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE sku ADD CONSTRAINT FK_F9038C4C964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id)');
        $this->addSql('CREATE INDEX IDX_F9038C44584665A ON sku (product_id)');
        $this->addSql('CREATE INDEX IDX_F9038C4C964ABE2 ON sku (product_option_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_option_value (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, product_option_id INT NOT NULL, value VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_A938C7374584665A (product_id), INDEX IDX_A938C737C964ABE2 (product_option_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE product_option_value ADD CONSTRAINT FK_A938C7374584665A FOREIGN KEY (product_id) REFERENCES product (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE product_option_value ADD CONSTRAINT FK_A938C737C964ABE2 FOREIGN KEY (product_option_id) REFERENCES product_option (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE sku DROP FOREIGN KEY FK_F9038C44584665A');
        $this->addSql('ALTER TABLE sku DROP FOREIGN KEY FK_F9038C4C964ABE2');
        $this->addSql('DROP INDEX IDX_F9038C44584665A ON sku');
        $this->addSql('DROP INDEX IDX_F9038C4C964ABE2 ON sku');
        $this->addSql('ALTER TABLE sku ADD product_option_value_id INT NOT NULL, DROP product_id, DROP product_option_id, DROP option_value');
        $this->addSql('ALTER TABLE sku ADD CONSTRAINT FK_F9038C4EBDCCF9B FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_F9038C4EBDCCF9B ON sku (product_option_value_id)');
    }
}
